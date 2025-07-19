import { Alert, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

import { ButtonsGrid } from './components/buttons-grid';
import { AnimatedNumber } from './components/animated-number';

const App = () => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  const [number, setNumber] = useState('0');
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AnimatedNumber number={number} />
      </View>
      <View style={{ flex: 1, marginBottom: safeBottom }}>
        <ButtonsGrid
          onButtonPressed={item => {
            if (item === 'backspace') {
              if (number.length === 1) {
                setNumber('0');
                return;
              }
              setNumber(prev => prev.slice(0, -1));
              return;
            }
            setNumber(prev => {
              if (prev.length === 10) {
                Alert.alert(
                  'Maximum Length Reached',
                  'You can only enter up to 10 digits.',
                );
                return prev;
              }
              if (prev === '0') {
                return String(item);
              }
              return prev + String(item);
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export { App };
