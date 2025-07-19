import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const squareSize = 120;

const App = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          rotate.value = withTiming(rotate.value + 90); // Rotate by 90 degrees on each touch end
        }}
        style={[styles.square, rStyle]}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const maxTranslate = 100;
          translateX.value = withSpring(
            Math.random() * maxTranslate - maxTranslate / 2,
          );
          translateY.value = withSpring(
            Math.random() * maxTranslate - maxTranslate / 2,
          );
        }}
      />
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
  square: {
    width: squareSize,
    height: squareSize,
    backgroundColor: '#00d0ff',
    borderRadius: 30,
    borderCurve: 'continuous',
  },

  button: {
    width: 64,
    height: 64,
    backgroundColor: '#111',
    position: 'absolute',
    bottom: 48,
    right: 32,
    borderRadius: 32,
  },
});

export { App };
