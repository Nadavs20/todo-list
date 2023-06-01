import moment from "moment";

export const validateDate = (dateStr: string) => {
  if (!dateStr) {
    return false;
  }

  const givenDate = moment(dateStr);
  const today = moment();

  return givenDate.isSameOrAfter(today, "day");
};

export const validateDescription = (description: string) => {
  const regex = /^([a-zA-Z0-9 \u0590-\u05FF]){1,100}$/;
  return regex.test(description);
};
