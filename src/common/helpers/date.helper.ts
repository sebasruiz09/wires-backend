export const DateHelper = (date: string) => {
  try {
    const newDate = new Date(date).toISOString;
    return newDate;
  } catch (error) {
    console.log(error);
  }
};
