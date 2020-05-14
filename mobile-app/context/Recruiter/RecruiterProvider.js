import * as React from 'react';
import recruiterApi from '../../api/recruiter';
import RecruiterContext from './RecruiterContext';

const recruiterReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_OFFER':
      return {
        ...state,
        isSavedOffer: true,
      };
    default:
      return {
        ...state,
      };
  }
};

const initialState = {
    isSavedOffer:false
};

function RecruiterProvider(props) {
  const [state, dispatch] = React.useReducer(recruiterReducer, initialState);

  const actions = React.useMemo(
    () => ({
      createOffer: async (form) => {
        const offer = await recruiterApi.createOffer(form);
        if(1/*a ete enregistré*/){
            dispatch({type: 'SAVE_OFFER'});
        }
    }}),
    []
  );
  return (
    <>
      <RecruiterContext.Provider value={{state, dispatch, actions}}>
        {props.children}
      </RecruiterContext.Provider>
    </>
  );
}

export default RecruiterProvider;
