export default {
  getAll() {
    fetch('https://localhost:8443/offers')
      .then(response => response)
      // .then(data => console.log(data))
      .catch(function(errors) {
        console.log('test', errors);
      });
  },
  getPending() {},
};
