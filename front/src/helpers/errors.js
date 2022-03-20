export const extractErrorMessage = (error) => {
  if (error.message) {
    let errorParts = error.message.split("'");

    if (errorParts.length > 1) {
      return JSON.parse(errorParts[1]).value.data.message;
    }

    return error.message;
  }
  return error;
};
