const extractCallback = allArgs => {
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

module.exports = extractCallback;
