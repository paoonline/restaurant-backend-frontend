import { IMenuRequest, IRestaurantRequest } from "../model/restaurantRequest";
import config from '../../../config.json'
import { IFullMenu, IRestaurant, IShortMenu } from "../model/restaurant";
const PREFIX_API = config.PREFIX_API

export const restaurantService = async ({ restaurantId }: IRestaurantRequest): Promise<IRestaurant> => {
    try {
        const response = await fetch(`${PREFIX_API}/${restaurantId}.json`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const restaurantShortMenuService = async ({ restaurantId, menuName }: IMenuRequest): Promise<IShortMenu> => {
    try {
        const response = await fetch(`${PREFIX_API}/${restaurantId}/menus/${menuName}/short.json`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};


export const restaurantFullMenuService = async ({ restaurantId, menuName }: IMenuRequest): Promise<IFullMenu> => {
    try {
        const response = await fetch(`${PREFIX_API}/${restaurantId}/menus/${menuName}/full.json`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};