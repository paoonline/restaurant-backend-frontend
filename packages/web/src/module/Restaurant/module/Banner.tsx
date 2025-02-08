import { Box } from "@mui/material";
const defaultImage = "/assets/DefaultImage.png";

const Banner = ({url}: {url: string}) => (
    <Box
        sx={{
            width: "100%",
            height: 300,
            backgroundImage: `url(${url || defaultImage})`,
            backgroundSize: "cover", // Ensures the image covers the box
            backgroundPosition: "center",
        }}
    />
);

export default Banner