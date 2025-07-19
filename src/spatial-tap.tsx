import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const circleRadius = 30;
const App = () => {
  const left = useSharedValue(0);
  const top = useSharedValue(0);

  const scale = useSharedValue(0);

  const previousLeft = useSharedValue(0);
  const previousTop = useSharedValue(0);

  const animatedLeft = useDerivedValue(() => {
    return withTiming(left.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  });

  const animatedTop = useDerivedValue(() => {
    return withTiming(top.value, {
      duration: 1000,
    });
  });

  const tapGesture = Gesture.Tap().onBegin(event => {
    previousLeft.value = left.value;
    previousTop.value = top.value;
    left.value = event.x - circleRadius;
    top.value = event.y - circleRadius;
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      left: left.value,
      top: top.value,
      transform: [{ scale: scale.value }],
    };
  }, [left, top]);

  const rPreviousStyle = useAnimatedStyle(() => {
    return {
      left: previousLeft.value,
      top: previousTop.value,
    };
  }, [previousLeft, previousTop]);

  const rMagicStyle = useAnimatedStyle(() => {
    return {
      left: animatedLeft.value,
      top: animatedTop.value,
    };
  }, [animatedLeft, animatedTop]);

  useAnimatedReaction(
    () => left.value,
    (curr, prev) => {
      if (curr !== prev && curr !== 0) {
        cancelAnimation(scale);
        scale.value = 0;
        scale.value = withSpring(1, {
          mass: 0.5,
        });
      }
    },
  );

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={styles.container}>
        <StatusBar style="light" />
        <Animated.View style={[styles.baseCircle, rStyle]} />
        <Animated.View style={[styles.baseCircle, rPreviousStyle]} />
        <Animated.View
          style={[
            styles.baseCircle,
            {
              backgroundColor: '#0074d3',
            },
            rMagicStyle,
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  baseCircle: {
    width: circleRadius * 2,
    height: circleRadius * 2,
    backgroundColor: '#2f2f2f',
    borderRadius: circleRadius,
    position: 'absolute',
  },
});

export { App };
