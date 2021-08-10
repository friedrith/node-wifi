const extractArgs = allArgs => {
  const callbackIndex = allArgs.length - 1;
  if (callbackIndex >= 0 && typeof allArgs[callbackIndex] === 'function') {
    return {
      callback: allArgs[callbackIndex],
      args: allArgs.slice(0, callbackIndex)
    };
  }

  return {
    callback: null,
    args: allArgs
  };
};

module.exports =
  func =>
  config =>
  (...allArgs) => {
    const { args, callback } = extractArgs(allArgs);

    if (typeof callback === 'function') {
      func(config, ...args)
        .then(response => {
          callback(null, response);
        })
        .catch(error => {
          callback(error);
        });
    } else {
      return func(config, ...args);
    }
  };
