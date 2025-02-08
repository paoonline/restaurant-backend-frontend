import { Box, Typography } from "@mui/material";
import { IRestaurant, IShortMenu } from "../../../model/restaurant";
import { BoxRestaurantContainer } from "../../../base/BoxContainer";
import Discount from "../../../base/Discount";
import { translations } from "../../../base/lang";
import isTimeDiscount from "../hooks/useTimeDiscount";
import usePrice from "../hooks/usePrice";
import MenuImage from "../../../base/MenuImage";

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

            return (
              <BoxRestaurantContainer
                data-testid={"menu-" + i}
                mt={4}
                key={res + i}
                display="flex"
                alignItems="center"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => onOpenModal(true, id as unknown as string)}
              >
                <MenuImage thumbnailImage={thumbnailImage} />
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
                    {price} {translations.baht}
                  </Typography>
                  {hasDiscount ? (
                    <Discount
                      disCount={`${translations.discount} ${
                        findMenuObject(res)?.discountedPercent
                      } %`}
                    />
                  ) : null}
                </Box>
              </BoxRestaurantContainer>
            );
          })
      ) : (
        <Typography variant="body2" color="text.secondary" textAlign={"center"}>
          {translations.no_menu}
        </Typography>
      )}
    </>
  );
};

export default MenuLists;
