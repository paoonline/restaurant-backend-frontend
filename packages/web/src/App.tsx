import { useEffect } from "react";
import { restaurantService } from "./service/restaurantService";
import Shop from "./module/shop";
import "./root.css";

import { createTheme, ThemeProvider } from "@mui/material";
import useMenu from "./hooks/useMenu";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // Set your desired font family
  },
});

function App() {
  // useEffect(() => {
  //   restaurantService(567051);
  // }, []);

  const {shopId, onSetShopId} = useMenu()

  return (
    <ThemeProvider theme={theme}>
      {!shopId  && <Shop callback={onSetShopId}/>}
    </ThemeProvider>
  );
}

export default App;
