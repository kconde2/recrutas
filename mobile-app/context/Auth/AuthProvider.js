import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import AuthContext from './AuthContext';
import register from '../../api/auth/register';
import activateAccount from '../../api/auth/activate-account';

const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_UP':
      return {
        ...prevState,
        isLoading: false,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
}

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: null
}

function AuthProvider(props) {

  const [state, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const actions = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        return register(data).then((user) => {
          dispatch({ type: 'SIGN_UP', user });
          return Promise.resolve(user)
        }).catch(error => {
          return Promise.reject(error)
        })
      },
      activateAccount: async token => {
        return activateAccount(token).then((user) => {
          return Promise.resolve(user)
        }).catch(error => {
          return Promise.reject(error)
        })
      }
    }),
    []
  );

  const isAuthenticated = () => {
    return state.userToken !== null && state.userToken.length > 0;
  };

  return <>
    <AuthContext.Provider value={{ state, dispatch, actions, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  </>
}

export default AuthProvider;
