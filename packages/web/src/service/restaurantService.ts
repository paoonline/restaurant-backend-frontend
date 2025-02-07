import axios from "axios";
import { IFullMenu, IRestaurant, IShortMenu } from "../model/restaurant";
import { IMenuRequest } from "../model/restaurantRequest";

const PREFIX_API = "http://localhost:3001";

export const restaurantService = async (
  restaurantId: number
): Promise<IRestaurant> => {
  try {
    const result = await axios.get(`${PREFIX_API}/restaurant/${restaurantId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const restaurantShortMenuService = async ({
  restaurantId,
  menuName,
}: IMenuRequest): Promise<IShortMenu> => {
  try {
    const result = await axios.get(
      `${PREFIX_API}/shortmenu/${restaurantId}/${menuName}`
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const restaurantFullMenuService = async ({
  restaurantId,
  menuName,
}: IMenuRequest): Promise<IFullMenu> => {
  try {
    const result = await axios.get(
      `${PREFIX_API}/fullmenu/${restaurantId}/${menuName}`
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};
