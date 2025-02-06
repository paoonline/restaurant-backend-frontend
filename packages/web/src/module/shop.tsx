import { Box } from "@mui/material";
import color from "../base/color";
import styled from "@emotion/styled";

const shopData = [
  {
    id: 567051,
    name: "ร้านลืมเคี้ยว",
  },
  {
    id: 227018,
    name: "Ekkamai Macchiato - Home Brewer",
  },
];

interface ShopProps {
  callback(value: number): void;
}

const Shop = ({ callback }: ShopProps): JSX.Element => {
  return (
    <BoxContainer>
      {shopData.map((res) => (
        <BoxColor key={res.id} onClick={() => callback(res.id)}>
          <TextColor>{res.name}</TextColor>
        </BoxColor>
      ))}
    </BoxContainer>
  );
};

const BoxContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  cursor: pointer;
`;

const BoxColor = styled(Box)`
  width: 50%;
  height: 200px;
  background-color: ${color.base};

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const TextColor = styled(Box)`
  color: ${color.text};
  font-size: 24px;
`;

export default Shop;
