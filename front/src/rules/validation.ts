export const validateDate = (dateStr: string): boolean => {
  if (!dateStr) {
    return false;
  }

  const givenDate = new Date(dateStr);
  const today = new Date();

  return givenDate.getTime() >= today.getTime();
};

export const validateDescription = (description: string): boolean => {
  const regex = /^([a-z]|[A-Z]|[0-9]){1,100}$/;

  return regex.test(description);
};
