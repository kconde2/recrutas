import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import ApplicationListContext from '../../../context/Recruiter/ApplicationListContext';
import AuthContext from '../../../context/Auth/AuthContext';

function PendingApplicationListScreen({ navigation }) {
  const { state, actions } = React.useContext(ApplicationListContext);
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    actions.getAll(authContext.state.user.id, authContext.state.user.token);
  }, []);

  let options = []

  if (state.applications.length) {
    state.applications.forEach(offer => {
      offer.applications.forEach(application => {
        if (application.status === 'opened') {
          application = { ...application, offerName: offer.name, contractType: offer.contratType };
          options.push(application)
        }
      })
    });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Applicant</DataTable.Title>
            <DataTable.Title numeric>Wage</DataTable.Title>
            <DataTable.Title >Status</DataTable.Title>
            <DataTable.Title >Offer</DataTable.Title>
            <DataTable.Title >Contract</DataTable.Title>
          </DataTable.Header>

          {
            options.length ?
              options.map((record, index) => {
                return (
                  <DataTable.Row
                    onPress={() => navigation.navigate('RecruiterApplicationDetails', {
                      id: record.id,
                    })}>
                    <DataTable.Cell>{record.applicant.firstname}</DataTable.Cell>
                    <DataTable.Cell>{record.wage}</DataTable.Cell>
                    <DataTable.Cell>{record.status}</DataTable.Cell>

                    <DataTable.Cell >{record.offerName}</DataTable.Cell>
                    <DataTable.Cell >{record.contractType}</DataTable.Cell>
                  </DataTable.Row>
                );
              }) :
              <DataTable.Row>
                <DataTable.Cell>No pending applications found.</DataTable.Cell>
              </DataTable.Row>
          }

          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
              console.log(page);
            }}
            label="1-2 of 6"
          />
        </DataTable>
      </ScrollView>
    </SafeAreaView>

  );
}

export default PendingApplicationListScreen;
