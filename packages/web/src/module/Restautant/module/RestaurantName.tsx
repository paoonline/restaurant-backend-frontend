import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  styled,
} from "@mui/material";
import color from "../../../base/color";
import { useState } from "react";

const RestaurantName = ({
  name,
  isClosed,
  searchLists,
  onSearch,
}: {
  searchLists: string[];
  name: string;
  onSearch: (searchValue: string) => void;
  isClosed: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const handleOnSearch = (searchValue: string) => {
    setSearchValue(searchValue);
    onSearch(searchValue);
  };

  const handleClickList = (menu: string) => {
    handleOnSearch(menu);
  };

  return (
    <BoxContainer mt={2}>
      <Box flexDirection={"row"} display={"flex"} alignItems={"center"}>
        <TextContainer>{name}</TextContainer>
        <Box
          sx={{
            backgroundColor: isClosed ? color.red : color.base,
            padding: 1,
          }}
          borderRadius={1}
        >
          <TextStatusContainer isClosed={isClosed}>
            {isClosed ? "ปิด" : "เปิด"}
          </TextStatusContainer>
        </Box>
      </Box>

      <Box ml={5}>
        <TextField
          id="outlined-basic"
          label="ค้นหาร้านอาหาร"
          variant="outlined"
          type="search"
          value={searchValue}
          onChange={(e) => {
            handleOnSearch(e.target.value);
          }}
        />

        {searchValue && (
          <Paper
            elevation={3}
            sx={{
              maxHeight: 200,
              overflow: "auto",
              mt: 1,
              position: "absolute",
            }}
          >
            <List sx={{ cursor: "pointer" }}>
              {searchLists.length > 0 ? (
                searchLists.map((menu, index) => (
                  // @ts-ignore
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleClickList(menu)}
                  >
                    <ListItemText primary={menu} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No results found" />
                </ListItem>
              )}
            </List>
          </Paper>
        )}
      </Box>
    </BoxContainer>
  );
};

const TextContainer = styled("div")`
  font-size: 24px;
  padding-right: 10px;
`;

const BoxContainer = styled(Box)`
  display: flex;
  height: 100%;
  padding-left: 100px;
  flex-direction: row;
  align-items: center;
`;

const TextStatusContainer = styled("div")<{ isClosed?: boolean }>`
  font-size: 24px;
  color: ${color.textWhite};
`;

export default RestaurantName;
