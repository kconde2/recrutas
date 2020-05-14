export default {
    getAll() {
      return fetch('https://localhost:8443/applications', {
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
  };
  