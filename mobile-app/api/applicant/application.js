export default {
    getAllAccepted() {
      return fetch('https://localhost:8443/applications?properties[]=status&status=accepted&properties[]=age&properties[]=motivation&properties[]=wage&properties[]=resume&properties[offer][]=name&applicant=21', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(function(data) {
          return data.json();
        })
        .then(app => Promise.resolve(app))
        .catch(error => Promise.reject(error));
    },
    getAll() {
      return fetch('https://localhost:8443/applications?properties[]=status&properties[]=age&properties[]=motivation&properties[]=wage&properties[]=resume&properties[offer][]=name&applicant=21', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(function(data) {
          return data.json();
        })
        .then(app => Promise.resolve(app))
        .catch(error => Promise.reject(error));
    }
  };
  