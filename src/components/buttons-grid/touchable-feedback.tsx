import type { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TouchableFeedbackProps = {
  children?: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const TouchableFeedback = ({
  children,
  onPress,
  disabled,
  style,
}: TouchableFeedbackProps) => {
  const isActive = useSharedValue(false);
  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      isActive.value = true;
    })
    .onTouchesUp(() => {
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onEnd(() => {
      isActive.value = false;
    });

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: isActive.value ? 'rgba(255,255,255,0.1)' : 'transparent',
      transform: [{ scale: withTiming(isActive.value ? 0.95 : 1) }],
    };
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[style, rButtonStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};
