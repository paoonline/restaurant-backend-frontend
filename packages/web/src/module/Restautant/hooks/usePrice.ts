const usePrice = ({
  discountedPercent,
  price,
}: {
  price: number;
  discountedPercent: number;
}) => (discountedPercent ? price - (price * discountedPercent) / 100 : price);


export default usePrice