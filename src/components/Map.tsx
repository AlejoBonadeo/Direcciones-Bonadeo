import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

const Map = () => {
  const {
    hasLocation,
    initialPosition,
    getCurrrentLocation,
    followUser,
    currentLocation,
    stopFollowingUser,
    polylines,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef(true);
  const [showPolyline, setShowPolyline] = useState(true);

  useEffect(() => {
    followUser();

    return () => {
      stopFollowingUser;
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;
    mapViewRef.current?.animateCamera({
      center: currentLocation,
    });
  }, [currentLocation]);

  const centerPosition = async () => {
    const location = await getCurrrentLocation();
    mapViewRef.current?.animateCamera({
      center: location,
    });
    following.current = true;
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        initialRegion={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{flex: 1}}
        showsUserLocation
        ref={el => (mapViewRef.current = el!)}
        onTouchStart={() => (following.current = false)}>
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Place Name"
          description="Place Description"
        /> */}
        {showPolyline && (
          <Polyline
            coordinates={polylines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
      </MapView>
      <Fab
        icon="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
      <Fab
        icon="brush-outline"
        onPress={() => setShowPolyline(!showPolyline)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
        }}
      />
    </>
  );
};

export default Map;
