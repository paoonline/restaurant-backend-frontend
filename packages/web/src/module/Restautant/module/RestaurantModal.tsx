import { Box, Modal, Typography } from "@mui/material";

const RestaurantModal = ({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: (open: boolean) => void;
}) => (
  <Modal
    keepMounted
    open={open}
    onClose={() => onOpen(false)}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        width: { xs: "90%", sm: 400 },
        borderRadius: 2,
      }}
    >
      <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  </Modal>
);

export default RestaurantModal;
