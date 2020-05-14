import apiConfig from '../../apiConfig';

async function register(data) {console.log(data)
  return fetch(`${apiConfig.API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json',
    },
    body: JSON.stringify(data)
  }).then(function (data) {
    return data.json();
  }).then(app => Promise.resolve(app))
    .catch(error => Promise.reject(error));
}

export default register;
