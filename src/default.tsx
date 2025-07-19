import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Welcome to the React Native App!</Text>
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
