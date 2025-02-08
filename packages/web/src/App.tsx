import "./root.css";
import { createTheme, ThemeProvider } from "@mui/material";
import useMenu from "./hooks/useMenu";
import RestaurantSelect from "./module/RestaurantSelect";
import Restaurant from "./module/Restautant/Restaurant";
import { createContext, useContext } from "react";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // Set your desired font family
  },
});

const AppContext = createContext({
  onSetShopId: (shopId: number | null) => {}
});

export const useAppContext = () => useContext(AppContext);

function App() {
  const { shopId, IsSelectShopName, onSetShopId } = useMenu();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{onSetShopId:onSetShopId}}>
        {!IsSelectShopName && <RestaurantSelect callback={onSetShopId} />}
        {IsSelectShopName && <Restaurant shopId={shopId || 0} />}
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
