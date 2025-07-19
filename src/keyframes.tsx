import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, Keyframe } from 'react-native-reanimated';
import { useState } from 'react';

const perspective = 150;

const initialKeyframe = {
  opacity: 0,
  transform: [{ perspective }, { translateY: 75 }, { rotateX: '-25deg' }],
};

const endKeyframe = {
  opacity: 1,
  transform: [{ perspective }, { translateY: 0 }, { rotateX: '0deg' }],
};

const CustomFlipIn = new Keyframe({
  from: initialKeyframe,
  to: endKeyframe,
}).duration(250);

const CustomFlipOut = new Keyframe({
  from: endKeyframe,
  to: initialKeyframe,
}).duration(250);

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <TouchableOpacity
      onPress={() => {
        setIsVisible(prev => !prev);
      }}
      style={styles.container}
      activeOpacity={0.8}>
      <StatusBar style="auto" />

      {isVisible && (
        <Animated.View
          entering={CustomFlipIn}
          exiting={CustomFlipOut}
          style={{
            height: 120,
            aspectRatio: 1,
            backgroundColor: '#0086e6',
            borderRadius: 20,
            borderCurve: 'continuous',
          }}
        />
      )}
    </TouchableOpacity>
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
