export const compareTime = async (startDate) => {
    const offset = new Date().getTimezoneOffset()
    const epoch = new Date(`01/01/1970 ${-offset/60}:00:00`);
    const unixDate = Math.floor((new Date() - epoch) / 1000);
    return unixDate > startDate
  }