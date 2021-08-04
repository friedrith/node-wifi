const parse = stdout => {
  if (
    stdout &&
    stdout.includes('was not found in the preferred networks list')
  ) {
    throw new Error(stdout.trim());
  }
};

module.exports = parse;
