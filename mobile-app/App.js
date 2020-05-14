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
import RecruiterApplicationDetailsScreen from './screens/Recruiter/Applications/ApplicationScreen';
import RecruiterPendingApplicationList from './screens/Recruiter/Applications/PendingApplicationListScreen';
import RecruiterAccountScreen from './screens/Recruiter/AccountScreen';
import RecruiterApplicationListProvider from './context/Recruiter/ApplicationListProvider';
import LoginScreen from './screens/Auth/LoginScreen';
import AppScreen from './screens/AppScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <RecruiterApplicationListProvider>
        <AppContainer />
      </RecruiterApplicationListProvider>
    </AuthProvider>
  );
}

function AppContainer() {
  const { state, isAuthenticated } = React.useContext(AuthContext);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <NavigationContainer>
        {isAuthenticated() ? (
          <>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Accueil' }}
              />
              <Stack.Screen
                name="ListApplications"
                component={ListApplications}
              />
              <Stack.Screen
                name="DetailApplications"
                component={DetailApplications}
              />
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen
                name="RecruiterApplicationList"
                component={RecruiterApplicationListScreen}
                options={{ title: 'All applications' }}
              />
              <Stack.Screen
                name="RecruiterPendingApplicationList"
                component={RecruiterPendingApplicationList}
                options={{ title: 'All applications' }}
              />
              <Stack.Screen
                name="RecruiterApplicationDetails"
                component={RecruiterApplicationDetailsScreen}
                options={{ title: 'Aplication\'s details' }}
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
                <Stack.Screen
                  name="AppScreen"
                  component={AppScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ForgotPasswordScreen"
                  component={ForgotPasswordScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </>
          )}
      </NavigationContainer>
    </>
  );
}

export default App;
