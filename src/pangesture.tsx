import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const squareSize = 120;

const App = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });
  const isDragging = useSharedValue(false);
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true;
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onFinalize(() => {
      isDragging.value = false;
    });

  const rotate = useDerivedValue(() => {
    return withSpring(isDragging.value ? '45deg' : `0deg`);
  });

  const scale = useDerivedValue(() => {
    return withSpring(isDragging.value ? 0.9 : 1);
  });

  const color = useDerivedValue(() => {
    if (isDragging.value) {
      return '#0099ff'; // Red when dragging
    }

    const isInWhiteArea = translateY.value < 0;
    const isInBlackArea = translateY.value > 0;
    if (isInWhiteArea) {
      return 'black'; // White when in the top half
    }

    if (isInBlackArea) {
      return 'white'; // Black when in the bottom half
    }
    return '#0099ff'; // Original color
  });

  const animatedColor = useDerivedValue(() => {
    return withTiming(color.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedColor.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: rotate.value },
        { scale: scale.value },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.square, rStyle]} />
      </GestureDetector>

      <View style={styles.background} />
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
    height: squareSize,
    width: squareSize,
    backgroundColor: '#0099ff',
    borderRadius: 30,
    borderCurve: 'continuous',
  },
  background: {
    position: 'absolute',
    top: '50%',
    left: 0,
    height: '50%',
    width: '100%',
    backgroundColor: '#000',
    zIndex: -1,
  },
});

export { App };
