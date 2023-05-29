export const validateDate = (dateStr: string): boolean => {
  if (!dateStr) {
    return false;
  }

  const givenDate = new Date(dateStr);
  const today = new Date();

  return givenDate.getTime() >= today.getTime();
};

export const validateDescription = (description: string): boolean => {
  const regex = /^([a-zA-Z0-9 \u0590-\u05FF]){1,100}$/;
  return regex.test(description);
};
