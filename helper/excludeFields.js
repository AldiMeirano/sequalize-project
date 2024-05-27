function excludeFields(data, keys) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key))
  );
}

module.exports = excludeFields;
