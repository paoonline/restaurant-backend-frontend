import "./root.css";
import { createTheme, ThemeProvider } from "@mui/material";
import useMenu from "./hooks/useMenu";
import RestaurantSelect from "./module/RestaurantSelect";
import Restaurant from "./module/Restautant/Restaurant";
import { createContext, useContext, useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // Set your desired font family
  },
});

const AppContext = createContext({
  onSetRestaurantId: (restaurantId: number | null) => {},
  restaurantId: 0,
  loading: false,
  setLoading: (load: boolean) => {}
});

export const useAppContext = () => useContext(AppContext);

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { restaurantId, IsSelectShopName, onSetRestaurantId } = useMenu();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{onSetRestaurantId, restaurantId: restaurantId || 0, loading, setLoading}}>
        {!IsSelectShopName && <RestaurantSelect callback={onSetRestaurantId} />}
        {IsSelectShopName && <Restaurant />}
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
