const headers = {
  'Content-Type': 'application/json',
}

export default {
  getAll() {
    // TODO: Replace 3 by loggedIn recruiter's id
    return fetch(`https://localhost:8443/offers?author=3`, {
      method: 'GET',
      headers: headers,
    })
      .then(function (data) {
        return data.json();
      })
      .then(app => Promise.resolve(app))
      .catch(error => Promise.reject(error));
  },
  getSpecific(id) {
    return fetch(`https://localhost:8443/applications/${id}`, {
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
