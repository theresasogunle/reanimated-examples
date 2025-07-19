import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

const App = () => {
  const [ids, setIds] = useState<string[]>([]);
  // generate random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        setIds(() => [getRandomColor(), ...ids]);
      }}>
      <StatusBar style="auto" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 70 }}>
        {ids.map(id => {
          return (
            <Animated.View
              layout={LinearTransition.springify()}
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
              key={id}
              style={{
                height: 90,
                width: '95%',
                backgroundColor: id,
                borderRadius: 20,
                alignSelf: 'center',
                marginBottom: 10,
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export { App };
