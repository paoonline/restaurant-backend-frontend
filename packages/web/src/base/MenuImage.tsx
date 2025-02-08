import { Box } from "@mui/material";

const defaultImage = "/assets/DefaultImage.png";

const MenuImage = ({ thumbnailImage }: { thumbnailImage?: string }) => (
  <Box
    sx={{
      height: 90,
      width: 90,
      minWidth: 90,
      backgroundImage: `url(${thumbnailImage || defaultImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    borderRadius={2}
  />
);

export default MenuImage;
