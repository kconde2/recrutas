import apiConfig from '../../apiConfig';

export default {
    getAllAccepted() {
      return fetch(`${apiConfig.API_URL}/applications?properties[]=status&status=accepted&properties[]=age&properties[]=motivation&properties[]=wage&properties[]=resume&properties[offer][]=name&applicant=21`, {
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
      return fetch(`${apiConfig.API_URL}/applications?properties[]=status&properties[]=age&properties[]=motivation&properties[]=wage&properties[]=resume&properties[offer][]=name&applicant=21`, {
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
