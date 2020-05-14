export default {
    createOffer() {
        return fetch('https://localhost:8443/offers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": "string",
            "companyDetails": "string",
            "description": "string",
            "startAt": "2020-05-14T21:26:52.417Z",
            "contratType": "string",
            "workplace": "string",
             "applications": [],
             "author": "string"
        })
    })
      .then(function(data) {
        return data.json();
      })
      .then(app => Promise.resolve(app))
      .catch(error => console.log(error));
    },
    }
  