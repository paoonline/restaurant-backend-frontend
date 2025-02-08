import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import color from "../../../base/color";
import { useState } from "react";
import { useAppContext } from "../../../App";
import { translations } from "../../../base/lang";

const RestaurantName = ({
  name,
  isClosed,
  searchLists,
  onSearch,
  onOpenModal,
}: {
  searchLists: string[];
  name: string;
  onSearch: (searchValue: string) => void;
  onOpenModal: (open: boolean, id: string) => void;
  isClosed: boolean;
}) => {
  const {onSetShopId} = useAppContext()
  const [searchValue, setSearchValue] = useState("");
  const handleOnSearch = (searchValue: string) => {
    setSearchValue(searchValue);
    onSearch(searchValue);
  };

  const handleClickList = (menu: string) => {
    handleOnSearch(menu);
    onOpenModal(true, menu);
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
            {isClosed ? translations.close : translations.open }
          </TextStatusContainer>
        </Box>
      </Box>

      <Box
        ml={5}
        pr={1}
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' }, 
        }}
      >
        <TextField
          id="outlined-basic"
          label={translations.search_restaurant}
          variant="outlined"
          type="search"
          value={searchValue}
          onChange={(e) => {
            handleOnSearch(e.target.value);
          }}
        />

        <Box sx={{cursor:'pointer'}} onClick={() => onSetShopId(null)}>
          <Typography variant="subtitle1" color="info" fontSize={18}>
            {translations.back_to_main}
          </Typography>
        </Box>

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
                  <ListItemText primary={translations.seach_not_found} />
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
  padding-left: 20%;
  flex-direction: row;
  align-items: center;
`;

const TextStatusContainer = styled("div")<{ isClosed?: boolean }>`
  font-size: 24px;
  color: ${color.textWhite};
`;

export default RestaurantName;
