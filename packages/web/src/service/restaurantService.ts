import axios from "axios";
import { IRestaurant } from "../model/restaurant";

const PREFIX_API = 'http://localhost:3001'

export const restaurantService = async (
  restaurantId: number
): Promise<IRestaurant> => {
  try {
    const result = await axios.get(
       `${PREFIX_API}/restaurant/${restaurantId}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};
