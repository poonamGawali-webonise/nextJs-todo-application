export const required = (value) => {
  if (!value) {
    return false;
  }
  if (!value.toString().trim().length) {
    return false;
  }

  return true;
};
