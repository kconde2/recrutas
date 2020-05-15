import apiConfig from '../../apiConfig';

async function login(data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json',
    },
    body: JSON.stringify(data)
  }

  return new Promise((resolve, reject) => {
    fetch(`${apiConfig.API_URL}/authentication_token`, options)
      .then(response => {
        if (response.status === 401) {
          reject('Votre email ou mot de passe est incorrect');
        }

        if (response.status === 500) {
          reject("Une erreur inattendue s'est produite");
        }

        return response.json()
      })
      .then(user => {
        if (user.isActive === true) {
          // successfully logged in
          resolve(user);
        } else {
          reject("Votre compte n'a pas encore été activé 😅");
        }
      })
      .catch(() => {
        reject("Une erreur inattendue s'est produite");
      });
  });
}

export default login;
