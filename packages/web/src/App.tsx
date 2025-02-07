import "./root.css";
import { createTheme, ThemeProvider } from "@mui/material";
import useMenu from "./hooks/useMenu";
import RestaurantSelect from "./module/RestaurantSelect";
import Restaurant from "./module/Restautant/Restaurant";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // Set your desired font family
  },
});

function App() {
  const { shopId, IsSelectShopName, onSetShopId } = useMenu();

  return (
    <ThemeProvider theme={theme}>
      {!IsSelectShopName && <RestaurantSelect callback={onSetShopId} />}
      {IsSelectShopName && <Restaurant shopId={shopId || 0} />}
    </ThemeProvider>
  );
}

export default App;
