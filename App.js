import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logInScreen from './screens/LogInScreen'
import signUpScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen';
import NewChatScreen from './screens/NewChatScreen';

export default function App() {
  const Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LogIn' component={logInScreen}  />
        <Stack.Screen name='SignUp' component={signUpScreen}  />
        <Stack.Screen name='Home' component={HomeScreen}  />
        <Stack.Screen name='newChat' component={NewChatScreen} options={{presentation:"containedModal"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
