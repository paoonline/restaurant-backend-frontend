const useTimeDiscount = ({ begin, end }: { begin: string; end: string }) => {
  if (!begin) return false;
  const now = new Date();
  const currentTime = now.getHours() + now.getMinutes() / 60;
  const openTime = begin ? parseFloat(begin) : 0;
  const closeTime = end ? parseFloat(end) : 24;
  return currentTime >= openTime && currentTime <= closeTime;
};

export default useTimeDiscount;
