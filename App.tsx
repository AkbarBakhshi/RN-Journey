import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./global.css"

export default function App() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-3xl text-center p-4'>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
