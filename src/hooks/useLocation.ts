import Geolocation from '@react-native-community/geolocation';
import {useEffect, useRef, useState} from 'react';
import {Location} from '../interfaces/appInterfaces';

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>();
  const [currentLocation, setCurrentLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [polylines, setPolylines] = useState<Location[]>([]);
  const watchId = useRef<number>();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrrentLocation().then(location => {
      if (!isMounted.current) return;
      setInitialPosition(location);
      setCurrentLocation(location);
      setPolylines(lines => [...lines, location]);
      setHasLocation(true);
    });
  }, []);

  const getCurrrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          resolve({
            latitude,
            longitude,
          });
        },
        reject,
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 100,
        },
      );
    });
  };

  const followUser = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        if (!isMounted.current) return;
        setCurrentLocation({latitude, longitude});
        setPolylines(lines => [...lines, {latitude, longitude}]);
      },
      console.log,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 100,
        distanceFilter: 5,
      },
    );
  };

  const stopFollowingUser = () => {
    if (watchId.current) Geolocation.clearWatch(watchId.current);
  };

  return {
    hasLocation,
    initialPosition,
    getCurrrentLocation,
    followUser,
    currentLocation,
    stopFollowingUser,
    polylines,
  };
};

export default useLocation;
