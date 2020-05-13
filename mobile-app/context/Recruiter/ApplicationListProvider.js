import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ApplicationListContext from './ApplicationListContext';
import Api from '../../api/recruiter/application';

const applicationListReducer = (state, action) => {
  switch (action.type) {
    case 'ALL':
      return {
        ...state,
        applications: action.applications,
      };
    case 'PENDING':
      return {
        ...state,
        applications: action.applications,
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
        dispatch({
          type: 'ALL',
          applications,
        });
      },
      getPending: async () => {
        const pendingApplications = await Api.getPending();
        dispatch({
          type: 'PENDING',
          applications: pendingApplications,
        });
      },
    }),
    [],
  );
  return (
    <>
      <ApplicationListContext.Provider value={{state, dispatch, actions}}>
        {props.children}
      </ApplicationListContext.Provider>
    </>
  );
}

export default ApplicationListProvider;
