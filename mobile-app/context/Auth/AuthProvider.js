import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import AuthContext from './AuthContext';
import register from '../../api/auth/register';
import activateAccount from '../../api/auth/activate-account';
import login from '../../api/auth/login';

const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        user: action.user,
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
        user: null,
      };
  }
}

const initialState = {
  isLoading: true,
  isSignout: false,
  user: null
}

function AuthProvider(props) {

  const [state, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let user;

      try {
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', user: JSON.parse(user) });
    };

    bootstrapAsync();
  }, []);

  const actions = React.useMemo(
    () => ({
      signIn: async data => {
        return login(data).then(async (user) => {
          await AsyncStorage.setItem('user', JSON.stringify(user))
          dispatch({ type: 'SIGN_IN', user });
          return Promise.resolve(user)
        }).catch(error => {
          return Promise.reject(error)
        })
      },
      signOut: async () => {
        await AsyncStorage.removeItem('user')
        dispatch({ type: 'SIGN_OUT' })
      }
        ,
      signUp: async data => {
        return register(data).then((user) => {
          dispatch({ type: 'SIGN_UP', user: null });
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
    return state.user !== null;
  };

  return <>
    <AuthContext.Provider value={{ state, dispatch, actions, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  </>
}

export default AuthProvider;
