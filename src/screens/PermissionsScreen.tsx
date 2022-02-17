import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useContext} from 'react';
import {PermissionContext} from '../context/PermissionContext';
import Btn from '../components/Btn';

const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionContext);

  return (
    <View style={styles.container}>
      <Text>Es necesario usar el gps para usar esta aplicacion</Text>
      <Btn title="Permiso" onPress={askLocationPermission} />
      <Text>{JSON.stringify(permissions)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PermissionsScreen;
