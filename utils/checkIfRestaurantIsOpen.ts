export const isOpenNow = (openingHours: string): boolean => {
  const [startStr, endStr] = openingHours.split('-');

  const parseTime = (time: string): number => {
      const [hour, minute] = time.split(':').map(Number);
      return hour + minute / 60;
  };

  const start = parseTime(startStr);
  const end = parseTime(endStr);

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  if (end < start) {
      return currentHour >= start || currentHour < end;
  }

  return currentHour >= start && currentHour < end;
};
