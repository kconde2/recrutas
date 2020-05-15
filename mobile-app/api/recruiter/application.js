import apiConfig from '../../apiConfig'

const headers = {
  'Content-Type': 'application/json',
}

export default {
  getAll(author, token) {
    headers['Authorization'] = 'Bearer ' + token
    return fetch(`${apiConfig.API_URL}/offers?author=${author}`, {
      method: 'GET',
      headers: headers,
    })
      .then(function (data) {
        return data.json();
      })
      .then(app => Promise.resolve(app))
      .catch(error => Promise.reject(error));
  },
  getSpecific(id, token) {
    headers['Authorization'] = 'Bearer ' + token
    return fetch(`${apiConfig.API_URL}/applications/${id}`, {
      method: 'GET',
      headers: headers,
    })
      .then(function (data) {
        return data.json();
      })
      .then(app => Promise.resolve(app))
      .catch(error => Promise.reject(error));
  }
};
