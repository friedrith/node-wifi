module.exports = func => config => callback => {
  if (typeof callback === 'function') {
    func(config, callback);
  } else {
    return new Promise((resolve, reject) => {
      func(config, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};
