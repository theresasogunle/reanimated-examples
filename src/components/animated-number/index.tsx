import { useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type AnimatedNumberProps = {
  number: string;
};

export const AnimatedNumber = ({ number }: AnimatedNumberProps) => {
  const numbers = useMemo(() => {
    return number.split('');
  }, [number]);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(1.1 - 0.05 * numbers.length) }],
    };
  });

  return (
    <Animated.View
      layout={LinearTransition}
      style={[{ flexDirection: 'row' }, rContainerStyle]}>
      {numbers.map((num, index) => (
        <Animated.Text
          key={num + index}
          layout={LinearTransition}
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={{
            fontSize: 90,
            color: '#fff',
            fontFamily: 'SF-Pro-Rounded-Bold',
            marginHorizontal: 2,
          }}>
          {num}
        </Animated.Text>
      ))}
    </Animated.View>
  );
};
