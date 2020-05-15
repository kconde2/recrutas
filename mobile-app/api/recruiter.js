import apiConfig from '../apiConfig'

export default {
  createOffer(form) {
    return fetch(`${apiConfig.API_URL}/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(function (data) {
        return data.json();
      })
      .then(app => Promise.resolve(app))
      .catch(error => Promise.reject(error));
  },
}
