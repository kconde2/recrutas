import apiConfig from '../../apiConfig';

const headers = {
  'Content-Type': 'application/json',
}

export default {
  getAllAccepted(applicant, token) {
    headers['Authorization'] = 'Bearer ' + token
    return fetch(`${apiConfig.API_URL}/applications?properties[]=status&status=accepted&properties[]=age&properties[]=motivation&properties[]=wage&properties[]=resume&properties[offer][]=name&applicant=${applicant}`, {
      method: 'GET',
      headers: headers
    })
      .then(function (data) {
        return data.json();
      })
      .then(app => Promise.resolve(app))
      .catch(error => Promise.reject(error));
  },
  getAll(applicant, token) {
    headers['Authorization'] = 'Bearer ' + token
    return fetch(`${apiConfig.API_URL}/applications?properties[]=status&properties[]=age&properties[]=motivation&properties[]=wage&properties[]=resume&properties[offer][]=name&applicant=${applicant}`, {
      method: 'GET',
      headers: headers
    })
      .then(function (data) {
        return data.json();
      })
      .then(app => Promise.resolve(app))
      .catch(error => Promise.reject(error));
  }
};
