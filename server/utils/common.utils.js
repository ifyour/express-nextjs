exports.multipleColumnSet = function (object) {
  if (typeof object !== 'object') {
    throw new Error('Invalid input');
  }

  const keys = Object.keys(object);
  const values = Object.values(object);
  const columnSet = keys.map(key => `${key} = ?`).join(', ');

  return { columnSet, values }
}
