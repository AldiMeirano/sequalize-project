const response = (status, data, message) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};

module.exports = response;
