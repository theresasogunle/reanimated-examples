import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions, Image, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type ListImageProps = {
  uri: string;
  imageWidth: number;
  itemWidth: number;
  style?: StyleProp<ViewStyle>;
  scrollOffset: SharedValue<number>;
  index: number;
};

const { width: screenWidth } = Dimensions.get('window');

export const ListImage = ({
  uri,
  imageWidth,
  itemWidth,
  style,
  scrollOffset,
  index,
}: ListImageProps) => {
  const inputRange = [
    itemWidth * (index - 1),
    itemWidth * index,
    itemWidth * (index + 1),
  ];

  const rImageStyle = useAnimatedStyle(() => {
    const outputRange = [-screenWidth / 2, 0, screenWidth / 2];

    const translateX = interpolate(scrollOffset.value, inputRange, outputRange);
    return {
      transform: [
        {
          scale: 1.7,
        },
        {
          translateX: translateX,
        },
      ],
    };
  }, [scrollOffset]);

  const rContainerStyle = useAnimatedStyle(() => {
    const outputRange = [1, 1.05, 1];

    const scale = interpolate(scrollOffset.value, inputRange, outputRange);

    return {
      transform: [{ scale }],
    };
  }, []);
  return (
    <Animated.View
      style={[
        style,
        { overflow: 'hidden', borderRadius: 20 },
        rContainerStyle,
      ]}>
      <Animated.Image
        source={{ uri }}
        resizeMode={'cover'}
        style={[
          { width: imageWidth, aspectRatio: 0.6, borderRadius: 20 },
          rImageStyle,
        ]}
      />
    </Animated.View>
  );
};
