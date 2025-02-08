import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { restaurantFullMenuService } from "../../../service/restaurantService";
import { useAppContext } from "../../../App";
import { IFullMenu } from "../../../model/restaurant";
import Banner from "./Banner";
import { translations } from "../../../base/lang";
import CloseIcon from "@mui/icons-material/Close";
import Line from "../../../base/Line";
import Discount from "../../../base/Discount";
import isTimeDiscount from "../hooks/useTimeDiscount";
import usePrice from "../hooks/usePrice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  width: { xs: "90%", sm: 400 },
  minHeight: "40%",
  minWidth: { lg: "40%", sm: "60%" },
  borderRadius: 2,
};

const MenuDetail = ({
  open,
  menuName,
  onClosed,
}: {
  menuName: string;
  open: boolean;
  onClosed: (open: boolean) => void;
}) => {
  const { restaurantId, setLoading } = useAppContext();
  const [data, setData] = useState<IFullMenu>();
  const [isError, setError] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await restaurantFullMenuService({
        restaurantId,
        menuName,
      });

      setData(result);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const {
    discountedPercent,
    discountedTimePeriod,
    fullPrice,
    options,
    totalInStock,
  } = data || {};

  const pricePrimary = fullPrice || 0;
  const price = usePrice({
    discountedPercent: discountedPercent || 0,
    price: pricePrimary,
  });

  const hasDiscount =
    discountedPercent &&
    discountedTimePeriod &&
    isTimeDiscount({
      begin: discountedTimePeriod?.begin || "",
      end: discountedTimePeriod?.end || "",
    });

  const TitleSection = () => (
    <Box
 
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box flex={1} display="flex" justifyContent="center" p={2}>
        <Typography variant="h5">{menuName}</Typography>
      </Box>
      <IconButton onClick={() => onClosed(false)} data-testid="menu-detail-modal-closed">
        <CloseIcon />
      </IconButton>
    </Box>
  );

  const Detail = () => (
    <Box p={2}>
      <Box display="flex" flexDirection="row" justifyContent={"space-between"}>
        <Typography variant="h5">
          {translations.price} {price} {translations.baht}
        </Typography>

        {hasDiscount ? (
          <Discount
            disCount={`${translations.discount} ${data?.discountedPercent} %`}
          />
        ) : null}
      </Box>
      <Line />
      {options?.length && options?.length > 0 ? optionRender() : "-"}
      {stockRender()}
    </Box>
  );

  const stockRender = () => (
    <Box display="flex" flexDirection="row" justifyContent={"space-between"} mt={2}>
      <Typography variant="body1">{translations.stock}</Typography>
      <Typography variant="body1">{totalInStock}</Typography>
    </Box>
  );

  const optionRender = () => (
    <>
      {options?.map((res, i) => (
        <Box
          key={res.label + i}
          display="flex"
          flexDirection="row"
          justifyContent={"space-between"}
          mt={1}
        >
          <Typography variant="body1">เลือก {res.label}</Typography>
          <Box display="flex" flexDirection="column">
            {res.choices.map((res, i) => (
              <Typography key={res.label + i} variant="body1" textAlign='right'>
                {res.label}
              </Typography>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );

  useEffect(() => {
    if (menuName) {
      fetchData();
    }
  }, [menuName]);
  return (
    <Modal
      data-testid="menu-detail-modal"
      keepMounted
      open={open}
      disableAutoFocus
      disableEnforceFocus
      onClose={() => onClosed(false)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        {data ? (
          <Box>
            <TitleSection />
            <Banner url={data.largeImage || ""} />
            <Detail />
          </Box>
        ) : (
          isError && (
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              {translations.seach_not_found}
            </Typography>
          )
        )}
      </Box>
    </Modal>
  );
};

export default MenuDetail;
