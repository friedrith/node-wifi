module.exports = func => config => callback => {
  if (typeof callback === 'function') {
    func(config)
      .then(response => {
        callback(null, response);
      })
      .catch(error => {
        callback(error);
      });
  } else {
    return func(config);
  }
};
