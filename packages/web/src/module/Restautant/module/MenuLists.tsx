import { Box, Typography } from "@mui/material";
import { IRestaurant, IShortMenu } from "../../../model/restaurant";
import { BoxRestaurantContainer } from "../../../base/BoxContainer";

const MenuLists = ({
  data,
  callback,
  onOpenModal,
  menuDetailLists,
}: {
  data: IRestaurant;
  callback: (index: number) => void;
  onOpenModal: (open: boolean, id: string) => void;
  menuDetailLists: IShortMenu[];
}) => {
  const inTimeDiscount = ({ begin, end }: { begin: string; end: string }) => {
    if (!begin) return false;
    const now = new Date();
    const currentTime = now.getHours() + now.getMinutes() / 60;
    const openTime = begin ? parseFloat(begin) : 0;
    const closeTime = end ? parseFloat(end) : 24;
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const findMenuObject = (menuName: string) =>
    menuDetailLists?.find((result) => result.id === menuName);

  return (
    <>
      {data?.menus.length ? (
        data.menus
          .filter((_, i) => callback(i))
          .map((res, i) => {
            const {
              thumbnailImage,
              fullPrice,
              discountedPercent,
              id,
              discountedTimePeriod,
            } = findMenuObject(res) || {};
            const pricePrimary = fullPrice || 0;

            const price = discountedPercent
              ? pricePrimary - (pricePrimary * discountedPercent) / 100
              : pricePrimary;

            const hasDiscount =
              discountedPercent &&
              discountedTimePeriod &&
              inTimeDiscount({
                begin: discountedTimePeriod?.begin || "",
                end: discountedTimePeriod?.end || "",
              });

            return (
              <BoxRestaurantContainer
                mt={4}
                key={i}
                display="flex"
                alignItems="center"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => onOpenModal(true, id as unknown as string)}
              >
                <Box
                  sx={{
                    height: 90,
                    width: 90,
                    backgroundImage: `url(${thumbnailImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  borderRadius={2}
                />
                <Box ml={2} display="flex" flexDirection="column" mt={-3}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontSize={18}
                  >
                    {res}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontSize={16}
                  >
                    {price} บาท
                  </Typography>
                  {hasDiscount ? (
                    <Typography
                      variant="subtitle2"
                      color="warning"
                      fontSize={16}
                    >
                      ส่วนลด {findMenuObject(res)?.discountedPercent} %
                    </Typography>
                  ) : null}
                </Box>
              </BoxRestaurantContainer>
            );
          })
      ) : (
        <Typography variant="body2" color="text.secondary" textAlign={"center"}>
          ไม่มีเมนู
        </Typography>
      )}
    </>
  );
};

export default MenuLists;
