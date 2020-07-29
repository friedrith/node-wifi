const parse = stdout => {
  if (
    stdout &&
    stdout.indexOf('was not found in the preferred networks list') >= 0
  ) {
    throw new Error(stdout.trim());
  }
};

module.exports = parse;
