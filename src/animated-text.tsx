import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
const App = () => {
  // const [count, setCount] = useState(0);
  const count = useSharedValue(0);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.Text style={styles.count}>{count.value}</Animated.Text>
      <TouchableOpacity
        onPress={() => {
          const nextCount = Math.floor(Math.random() * 100);
          count.value = nextCount;
        }}
        style={styles.floatingButton}>
        <FontAwesome name="random" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    width: 64,
    height: 64,
    backgroundColor: '#111',
    position: 'absolute',
    bottom: 48,
    right: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'SF-Pro-Rounded-Bold',
  },
});

export { App };
