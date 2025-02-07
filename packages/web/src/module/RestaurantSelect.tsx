import { Box } from "@mui/material";
import color from "../base/color";
import styled from "@emotion/styled";
import { BoxContainer } from "../base/BoxContainer";

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

interface RestaurantSelectProps {
  callback(value: number): void;
}

const RestaurantSelect = ({ callback }: RestaurantSelectProps): JSX.Element => {
  return (
    <BoxContainer>
      {shopData.map((res) => (
        <BoxColor
          key={res.id}
          onClick={() => callback(res.id)}
          borderRadius={2}
        >
          <TextColor>{res.name}</TextColor>
        </BoxColor>
      ))}
    </BoxContainer>
  );
};

const BoxColor = styled(Box)`
  width: 60%;
  height: 200px;
  background-color: ${color.base};

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;
`;

const TextColor = styled(Box)`
  color: ${color.textWhite};
  font-size: 24px;
  text-align: center;
`;

export default RestaurantSelect;
