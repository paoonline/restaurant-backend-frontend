import { Typography } from "@mui/material";

const Discount = ({ disCount }: { disCount: string }) => (
  <Typography variant="subtitle2" color="warning" fontSize={16}>
    {disCount}
  </Typography>
);

export default Discount;
