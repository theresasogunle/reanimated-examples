import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedReaction,
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { Images } from './constants';
import { ListImage } from './components/list-image';

const { width: WindowWidth } = Dimensions.get('window');

const imageWidth = WindowWidth * 0.8;

const listPadding = (WindowWidth - imageWidth) / 2;

const itemInternalPadding = 10;

const itemContainerWidth = imageWidth + itemInternalPadding * 2;

const App = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(scrollRef);

  useAnimatedReaction(
    () => scrollOffset.value,
    current => {
      // You can add any reaction to the scroll offset here if needed
      // console.log('Scroll offset:', current);
    },
  );
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
          paddingLeft: listPadding,
          paddingRight: listPadding,
        }}
        snapToInterval={itemContainerWidth}
        pagingEnabled
        decelerationRate={'fast'}
        style={{ flex: 1 }}>
        {Images.map((image, index) => (
          <ListImage
            imageWidth={imageWidth}
            itemWidth={itemContainerWidth}
            style={{
              marginHorizontal: itemInternalPadding,
            }}
            key={image}
            uri={image}
            scrollOffset={scrollOffset}
            index={index}
          />
        ))}
      </Animated.ScrollView>
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
});

export { App };
