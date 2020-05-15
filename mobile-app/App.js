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
import DetailsScreen from './screens/DetailScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import AuthProvider from './context/Auth/AuthProvider';
import AuthContext from './context/Auth/AuthContext';
import OfferFormScreen from './screens/Recruiter/OfferFormScreen';
import OfferScreen from './screens/Recruiter/Offer'
import RecruiterApplicationListScreen from './screens/Recruiter/Applications/ApplicationListScreen';
import RecruiterApplicationDetailsScreen from './screens/Recruiter/Applications/ApplicationScreen';
import RecruiterPendingApplicationList from './screens/Recruiter/Applications/PendingApplicationListScreen';
import RecruiterAccountScreen from './screens/Recruiter/AccountScreen';
import ApplicantAccountScreen from './screens/Applicant/AccountScreen';
import RecruiterApplicationListProvider from './context/Recruiter/ApplicationListProvider';
import RecruiterProvider from './context/Recruiter/RecruiterProvider'
import AppScreen from './screens/AppScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';
import ApplicantApplicationProvider from './context/Applicant/ApplicationListProvider';
import ListApplicationsAccepted from './screens/ListApplicationsAccepted';
import DetailApplicationsAccepted from './screens/DetailApplicationsAccepted';
import ListApplications from './screens/ListApplications';
import DetailApplications from './screens/DetailApplications';

import ConfirmAccountInfoScreen from './screens/Auth/ConfirmAccountInfoScreen';
import ActivateAccountScreen from './screens/Auth/ActivateAccountScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import LogoutScreen from './screens/Auth/LogoutScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <RecruiterProvider>
        <RecruiterApplicationListProvider>
          <ApplicantApplicationProvider>
            <AppContainer />
          </ApplicantApplicationProvider>
        </RecruiterApplicationListProvider>
      </RecruiterProvider>
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
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
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
            <Stack.Screen
              name="ApplicantAccount"
              component={ApplicantAccountScreen}
              options={{ title: 'Applicant Account' }}
            />
            <Stack.Screen name="ListApplications" component={ListApplications} options={{ title: 'List Applications' }} />
            <Stack.Screen name="DetailApplications" component={DetailApplications} options={{ title: 'Detail Applications' }} />
            <Stack.Screen name="ListApplicationsAccepted" component={ListApplicationsAccepted} options={{ title: 'List Applications Accepted' }} />
            <Stack.Screen name="DetailApplicationsAccepted" component={DetailApplicationsAccepted} options={{ title: 'Detail Applications Accepted' }} />
            <Stack.Screen name="OfferForm" component={OfferFormScreen} />
            <Stack.Screen name="Offer" component={OfferScreen} />
            <Stack.Screen name="LogoutScreen" component={LogoutScreen} options={{ headerShown: false }} />
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
  </>
}


export default App;
