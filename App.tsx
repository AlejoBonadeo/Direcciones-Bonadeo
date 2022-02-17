import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router/Router';
import {PermissionsProvider} from './src/context/PermissionContext';

export default function App() {
  return (
    <NavigationContainer>
      <PermissionsProvider>
        <Router />
      </PermissionsProvider>
    </NavigationContainer>
  );
}
