const promiser = (func, args, callback) =>
  typeof callback === 'function'
    ? func(...args)
        .then(response => callback(null, response))
        .catch(error => callback(error))
    : func(...args);

module.exports = promiser;
