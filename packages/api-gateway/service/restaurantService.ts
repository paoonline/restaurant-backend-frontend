import { IMenuRequest, IRestaurantRequest } from "../model/restaurantRequest";

const PREFIX_API = 'https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants'

export const restaurantService = async ({ restaurantId }: IRestaurantRequest) => {
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

export const restaurantShortMenuService = async ({ restaurantId, menuName }: IMenuRequest) => {
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


export const restaurantFullMenuService = async ({ restaurantId, menuName }: IMenuRequest) => {
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