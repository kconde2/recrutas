import React, {Component} from 'react';
import {View} from 'react-native';
import {DataTable} from 'react-native-paper';
import ApplicationListContext from '../../../context/Recruiter/ApplicationListContext';

function ApplicationListScreen({navigation}) {
  const [applications, setApplications] = React.useState({});
  const {actions} = React.useContext(ApplicationListContext);

  React.useEffect(() => {
    actions.getAll().then(response => console.log(response));
    // .then(data => console.log(data));
  }, []);

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Applicant</DataTable.Title>
          <DataTable.Title numeric>Job</DataTable.Title>
          <DataTable.Title numeric>Company</DataTable.Title>
          <DataTable.Title numeric>Contract</DataTable.Title>
          <DataTable.Title numeric>Wage</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row
          onPress={() => navigation.navigate('RecruiterApplicationList')}>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
          <DataTable.Cell numeric>34k</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={page => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
    </View>
  );
}

export default ApplicationListScreen;
