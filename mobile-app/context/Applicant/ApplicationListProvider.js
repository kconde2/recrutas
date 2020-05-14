import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ApplicationContext from './ApplicationContext';
import Api from '../../api/applicant/application';

const applicationListReducer = (state, action) => {
  switch (action.type) {
    case 'ALL':
      return {
        ...state,
        applications: action.applications["hydra:member"],
      };
  }
};

const initialState = {
  applications: [],
};

function ApplicationListProvider(props) {
  const [state, dispatch] = React.useReducer(
    applicationListReducer,
    initialState,
  );

  const actions = React.useMemo(
    () => ({
      getAll: async () => {
        const applications = await Api.getAll();
        console.log('ici', applications);
        dispatch({
          type: 'ALL',
          applications,
        });
      }
    }),
    [],
  );
  return (
    <>
      <ApplicationContext.Provider value={{state, dispatch, actions}}>
        {props.children}
      </ApplicationContext.Provider>
    </>
  );
}

export default ApplicationListProvider;
