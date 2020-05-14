export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'L\'email est obligatoire.';
  if (!re.test(email)) return 'Ooops! Nous avons besoin d\'un email correct';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Le mot de passe est obligatoire.';

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Le nom est obligatoire.';

  return '';
};

export const addressValidator = (name) => {
  if (!name || name.length <= 0) return 'L\'adresse est obligatoire';

  return '';
};
