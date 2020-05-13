/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ListApplications from './screens/ListApplications';
import DetailApplications from './screens/DetailApplications';
import DetailsScreen from './screens/DetailScreen';
import SignInScreen from './screens/Auth/SignInScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import AuthProvider from './context/Auth/AuthProvider';
import AuthContext from './context/Auth/AuthContext';

const Stack = createStackNavigator();

function App() {
  return <AuthProvider>
    <AppContainer />
  </AuthProvider>
}

function AppContainer() {
  const { state, isAuthenticated } = React.useContext(AuthContext);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return <>
    <NavigationContainer>
      {isAuthenticated() ? (
        <>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="ListApplications" component={ListApplications} />
            <Stack.Screen name="DetailApplications" component={DetailApplications} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </>
      ) : (
          <>
            <Stack.Navigator initialRouteName="SignInScreen">
              <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Se connecter' }} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
          </>
        )}
    </NavigationContainer>
  </>;
}


export default App;
