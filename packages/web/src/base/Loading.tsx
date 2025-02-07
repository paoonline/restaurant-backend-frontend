import { Box, styled, CircularProgress as Loading } from "@mui/material";

const LoadingRender = () => {
  return (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  );
};

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 1000;
`;

export default LoadingRender;
