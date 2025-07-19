import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  clamp,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useRef } from 'react';

import { sections } from './constants';
import { ProgressIndicator } from './components/progress-indicator';
import { getReadingTime } from './get-reading-time';

const App = () => {
  const progress = useSharedValue(0);
  const scrollHeight = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      progress.value = clamp(
        event.contentOffset.y / (event.contentSize.height - scrollHeight.value),
        0,
        1,
      );
    },
  });
  const scrollRef = useRef<Animated.ScrollView>(null);
  const onReset = () => {
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onLayout={({ nativeEvent }) => {
          scrollHeight.value = nativeEvent.layout.height;
        }}
        contentContainerStyle={styles.scrollable}>
        {sections.map(({ title, description }, key) => {
          return (
            <View key={key} style={styles.listItem}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          );
        })}
      </Animated.ScrollView>
      <ProgressIndicator
        onReset={onReset}
        progress={progress}
        readingTime={getReadingTime(
          sections
            .map(({ title, description }) => `${title} ${description}`)
            .join(' '),
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  scrollable: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 160,
  },
  listItem: { marginBottom: 20 },
  description: {
    color: 'rgba(255,255,255,0.5)',
    marginTop: 8,
    fontSize: 18,
  },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});

export { App };
