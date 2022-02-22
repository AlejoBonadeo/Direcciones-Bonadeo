import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {MapEvent} from 'react-native-maps';
import {Location} from '../interfaces/appInterfaces';

const useMarkers = () => {
  const [markers, setMarkers] = useState<Location[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('markers').then(res => {
      res && setMarkers(JSON.parse(res));
    });
  }, []);

  const addMarker = async (e: MapEvent<{}>) => {
    e.persist();
    let storedMarkers: string | null | Location[] = await AsyncStorage.getItem(
      'markers',
    );
    const newMarker = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };
    if (storedMarkers) {
      storedMarkers = JSON.parse(storedMarkers) as Location[];
      storedMarkers.push(newMarker);
      setMarkers(storedMarkers);
      await AsyncStorage.setItem('markers', JSON.stringify(storedMarkers));
    } else {
      setMarkers([newMarker]);
      await AsyncStorage.setItem('markers', JSON.stringify([newMarker]));
    }
  };
  const removeMarker = async (removeIndex: number) => {
    const newMarkers = markers.filter((_, i) => i !== removeIndex);
    setMarkers(newMarkers);
    await AsyncStorage.setItem('markers', JSON.stringify(newMarkers));
  };
  return {
    markers,
    addMarker,
    removeMarker,
  };
};

export default useMarkers;
