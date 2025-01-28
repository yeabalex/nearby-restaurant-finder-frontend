export const isOpenNow = (openingHours: string): boolean => {
    const [start, end] = openingHours.split(' - ').map((time) => {
      const [hour, minute] = time.split(/[:\s]/).slice(0, 2).map(Number);
      const isPM = time.toLowerCase().includes('pm');
      return hour % 12 + (isPM ? 12 : 0) + minute / 60;
    });
  
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
  
    return currentHour >= start && currentHour < end;
};