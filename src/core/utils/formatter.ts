
export class Formatter {
  setTimeToActive(startHour: number) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    let hoursRemaining = 23;

    if (currentHour > startHour) {
      const remainingHoursOfDay = 23 - currentHour;
      hoursRemaining = remainingHoursOfDay + startHour;
    } else if (currentHour < startHour) {
      hoursRemaining = startHour - currentHour - 1;
    }

    const hoursInMillisecondsRemaining = 1000 * 60 * 60 * hoursRemaining;
    const minutesRemaining = 60 - currentMinute;
    const minutesInMillisecondsRemaining = minutesRemaining * 60 * 1000;

    return {
      getTime: () => hoursInMillisecondsRemaining + minutesInMillisecondsRemaining,
    };
  }
}