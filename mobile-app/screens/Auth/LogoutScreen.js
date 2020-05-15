import React, { memo, useState } from 'react';
import AuthContext from '../../context/Auth/AuthContext';
import { Text } from 'react-native';

function LogoutScreen({ route, navigation }) {
  const { actions } = React.useContext(AuthContext);

  React.useEffect(() => {
    actions.signOut()
  }, []);

  return <></>
};

export default memo(LogoutScreen);
