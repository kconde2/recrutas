import * as React from 'react';
import ApplicationListContext from './ApplicationListContext';
import Api from '../../api/recruiter/application';

const applicationListReducer = (state, action) => {
  switch (action.type) {
    case 'ALL':
      return {
        ...state,
        applications: action.applications["hydra:member"],
      };
    case 'SPECIFIC':
      return {
        ...state,
        application: action.application,
      };
  }
};

const initialState = {
  applications: [],
  application: {}
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
      getSpecific: async (id) => {
        const application = await Api.getSpecific(id);
        dispatch({
          type: 'SPECIFIC',
          application,
        });
      }
    }),
    [],
  );
  return (
    <>
      <ApplicationListContext.Provider value={{ state, dispatch, actions }}>
        {props.children}
      </ApplicationListContext.Provider>
    </>
  );
}

export default ApplicationListProvider;
