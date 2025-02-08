import { useEffect, useMemo, useState } from "react";
import {
  restaurantService,
  restaurantShortMenuService,
} from "../../service/restaurantService";
import { Box } from "@mui/material";
import { IRestaurant, IShortMenu } from "../../model/restaurant";

import LoadingRender from "../../base/Loading";
import PaginationModule from "./module/PaginationModule";
import Banner from "./module/Banner";
import RestaurantName from "./module/RestaurantName";
import MenuLists from "./module/MenuLists";
import { useAppContext } from "../../App";
import MenuDetail from "./module/MenuDetail";
import { translations } from "../../base/lang";

const Restaurant = () => {
  const [data, setData] = useState<IRestaurant>();
  const [dataSearch, setDataSearch] = useState<string[]>([]);
  const [menuDetailLists, setMenuDetailLists] = useState<IShortMenu[]>([]);
  const [page, setPage] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [menuName, setMenuName] = useState<string>("");
  const [isError, setError] = useState<boolean>(false)

  const { restaurantId, setLoading, loading } = useAppContext();

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await restaurantService(restaurantId);
      setData(result);
      handleMenuDetail(result);
    } catch (error) {
      setLoading(false);
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  const handleMenuDetail = async (data: IRestaurant) => {
    if (page > 0) {
      setLoading(true);
    }
    try {
      const results = await Promise.all(
        data?.menus
          .filter((_, i) => handlFilterList(i))
          .map(async (element) => {
            return await restaurantShortMenuService({
              restaurantId,
              menuName: element,
            });
          })
      );

      setMenuDetailLists(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handlFilterList = (index: number) => {
    if (page === 0) {
      return index < 10;
    }
    const startPage = (page - 1) * 10;
    const endPage = (page - 1) * 10 + 10;
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

  const handlModalCallback = (open: boolean, id: string) => {
    setOpenModal(open);
    setMenuName(id);
  };

  const onClosedModal = (open: boolean) => {
    setOpenModal(open);
    setMenuName("");
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    page > 0 && data && handleMenuDetail(data);
  }, [page]);

  return (
    <Box data-testid="restautant">
      <>
        {data ? (
          <>
            <Banner url={data?.coverImage} />
            <RestaurantName
              name={data?.name}
              isClosed={isClosed}
              onSearch={handleOnSearch}
              onOpenModal={handlModalCallback}
              searchLists={dataSearch}
            />
            <MenuLists
              onOpenModal={handlModalCallback}
              data={data}
              callback={handlFilterList}
              menuDetailLists={menuDetailLists}
            />
            {openModal && <MenuDetail
              open={openModal}
              menuName={menuName}
              onClosed={onClosedModal}
            />}
            <PaginationModule
              callback={handlePageChange}
              totalPage={Math.floor(data?.menus.length / 10)}
            />
          </>
        ) : isError && <p data-testid="error_not_found">{translations.seach_not_found}</p>}
        {loading && <LoadingRender />}
      </>
    </Box>
  );
};

export default Restaurant;
