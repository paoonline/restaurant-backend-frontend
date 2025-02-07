import { useEffect, useMemo, useState } from "react";
import {
  restaurantService,
  restaurantShortMenuService,
} from "../../service/restaurantService";
import { Box, Modal, Typography } from "@mui/material";
import { IRestaurant, IShortMenu } from "../../model/restaurant";

import LoadingRender from "../../base/Loading";
import PaginationModule from "./module/PaginationModule";
import Banner from "./module/Banner";
import RestaurantName from "./module/RestaurantName";
import MenuLists from "./module/MenuLists";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Restaurant = ({ shopId }: { shopId: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IRestaurant>();
  const [dataSearch, setDataSearch] = useState<string[]>([]);
  const [menuDetailLists, setMenuDetailLists] = useState<IShortMenu[]>([]);
  const [page, setPage] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const isClosed = useMemo(() => {
    const now = new Date();
    const currentTime = now.getHours() + now.getMinutes() / 60;

    const closeTime = data?.activeTimePeriod?.close
      ? parseFloat(data.activeTimePeriod.close)
      : 0;

    const openTime = data?.activeTimePeriod?.open
      ? parseFloat(data.activeTimePeriod.open)
      : 0;

    return currentTime >= closeTime || currentTime <= openTime;
  }, [data?.activeTimePeriod.close, data?.activeTimePeriod.open]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await restaurantService(shopId);
      setData(result);
      handleMenuDetail(result);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleMenuDetail = async (data: IRestaurant) => {
    if (page > 0) {
      setLoading(true);
    }
    try {
      const results = await Promise.all(
        data.menus
          .filter((_, i) => handlFilterList(i))
          .map(async (element) => {
            return await restaurantShortMenuService({
              restaurantId: shopId,
              menuName: element,
            });
          })
      );
      setMenuDetailLists(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlFilterList = (index: number) => {
    const startPage = page * 10;
    const endPage = page * 10 + 10;

    if (page === 0) {
      return index < 10;
    }
    return index >= startPage && index < endPage;
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOnSearch = (searchValue: string) => {
    const filterSearch =
      data?.menus.filter((res) =>
        res.toLowerCase().includes(searchValue.toLowerCase())
      ) || [];
    setDataSearch(filterSearch);
  };

  const handlModal = (open: boolean, id?: string) => {
    setOpenModal(open)
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    page > 0 && data && handleMenuDetail(data);
  }, [page]);

  return (
    <Box>
      <>
        {!!data && (
          <>
            <Banner url={data?.coverImage} />
            <RestaurantName
              name={data?.name}
              isClosed={isClosed}
              onSearch={handleOnSearch}
              searchLists={dataSearch}
            />
            <MenuLists
              onOpenModal={handlModal}
              data={data}
              callback={handlFilterList}
              menuDetailLists={menuDetailLists}
            />
            {/* // fix */}
            <Modal
              keepMounted
              open={openModal}
              onClose={() => handlModal(false)}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Text in a modal
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
            {/* // */}

            <PaginationModule
              callback={handlePageChange}
              totalPage={Math.floor(data?.menus.length / 10)}
            />
          </>
        )}

        {loading && <LoadingRender />}
      </>
    </Box>
  );
};

export default Restaurant;
