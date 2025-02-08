import express, { Application, Request, Response } from "express";
import {
  restaurantFullMenuService,
  restaurantService,
  restaurantShortMenuService,
} from "./service/restaurantService";
import { IRestaurant, IShortMenu, IFullMenu } from "./model/restaurant";
import { IRestaurantRequest, IMenuRequest } from "./model/restaurantRequest";
import cors from 'cors'

const app: Application = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(
  "/restaurant/:restaurantId",
  async (
    req: Request<IRestaurantRequest>,
    res: Response<IRestaurant | { error: string }>
  ) => {
    try {
      const restaurant = await restaurantService(req.params);
	    res.set('Cache-Control', 'public, max-age=300');
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurant data" });
    }
  }
);

app.get(
  "/shortmenu/:restaurantId/:menuName",
  async (
    req: Request<IMenuRequest>,
    res: Response<IShortMenu | { error: string }>
  ) => {
    try {
      const restaurant: IShortMenu = await restaurantShortMenuService({
        ...req.params,
      });
	  res.set('Cache-Control', 'public, max-age=300');
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurant data" });
    }
  }
);

app.get(
  "/fullmenu/:restaurantId/:menuName",
  async (
    req: Request<IMenuRequest>,
    res: Response<IFullMenu | { error: string }>
  ) => {
    try {
      const restaurant: IFullMenu = await restaurantFullMenuService({
        ...req.params,
      });
	    res.set('Cache-Control', 'public, max-age=300');
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch restaurant data" });
    }
  }
);

if (process.env.NODE_ENV !== 'test') {
  try {
    app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
    });
  } catch (error) {
    console.error(`Error occurred: ${(error as Error).message}`);
  }
}


export { app };