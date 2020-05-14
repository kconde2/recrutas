import apiConfig from '../../apiConfig';

async function register(data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json',
    },
    body: JSON.stringify(data)
  }

  return new Promise((resolve, reject) => {
    fetch(`${apiConfig.API_URL}/users`, options)
      .then(async (response) => {
        if (response.status === 500) {
          reject("Une erreur inattendue s'est produite");
        }

        if (response.status === 400) {
          return response.json()
            .catch(() => {
              reject("Une erreur inattendue s'est produite lors de la lecture des données. Ré-essayez !");
            }).then((data) => {
              reject(data.violations)
            });
        }

        return response.json()
      })
      .then(response => {
        resolve(response);
      })
      .catch(() => {
        reject("Une erreur inattendue s'est produite");
      });
  });
}

export default register;
