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
import RegisterScreen from './screens/Auth/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import AuthProvider from './context/Auth/AuthProvider';
import AuthContext from './context/Auth/AuthContext';
import RecruiterApplicationListScreen from './screens/Recruiter/Applications/ApplicationListScreen';
import RecruiterAccountScreen from './screens/Recruiter/AccountScreen';
import ApplicationListProvider from './context/Recruiter/ApplicationListProvider';
import LoginScreen from './screens/Auth/LoginScreen';
import AppScreen from './screens/AppScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';
import ConfirmAccountInfoScreen from './screens/Auth/ConfirmAccountInfoScreen';
import ActivateAccountScreen from './screens/Auth/ActivateAccountScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <ApplicationListProvider>
        <AppContainer />
      </ApplicationListProvider>
    </AuthProvider>
  );
}

function AppContainer() {
  const { state, isAuthenticated } = React.useContext(AuthContext);
  const linking = {
    prefixes: ['https://myapp.com', 'myapp://'],
    config: {
      ActivateAccountScreen: 'validate/:token',
      LoginScreen: 'account/login',
    },
  };

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return <>
    <NavigationContainer linking={linking} fallback={<SplashScreen />}>
      {isAuthenticated() ? (
        <>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="ListApplications" component={ListApplications} />
            <Stack.Screen name="DetailApplications" component={DetailApplications} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen
              name="RecruiterApplicationList"
              component={RecruiterApplicationListScreen}
              options={{ title: 'All applications' }}
            />
            <Stack.Screen
              name="RecruiterAccount"
              component={RecruiterAccountScreen}
              options={{ title: 'Recruiter account' }}
            />
          </Stack.Navigator>
        </>
      ) : (
          <>
            <Stack.Navigator initialRouteName="AppScreen">
              <Stack.Screen name="AppScreen" component={AppScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ConfirmAccountInfoScreen" component={ConfirmAccountInfoScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ActivateAccountScreen" component={ActivateAccountScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </>
        )}
    </NavigationContainer>
  </>;
}

export default App;
