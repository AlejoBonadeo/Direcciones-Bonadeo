import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  icon: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Fab = ({icon, onPress, style = {}}: Props) => {
  return (
    <View style={{...(style as any)}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.blackBtn}>
        <Icon name={icon} color="white" size={35} style={{left: 1}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackBtn: {
    zIndex: 10,
    height: 50,
    width: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    elevation: 6,
  },
});

export default Fab;
