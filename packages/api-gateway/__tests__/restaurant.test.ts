import { app } from "..";
import {
  restaurantFullMenuService,
  restaurantService,
  restaurantShortMenuService,
} from "../service/restaurantService";
import request from "supertest";
jest.mock("../service/restaurantService", () => ({
  restaurantService: jest.fn(),
  restaurantShortMenuService: jest.fn(),
  restaurantFullMenuService: jest.fn()
}));

const restaurantMock = {
  name: "Restaurant",
  id: "1",
  coverImage: "",
  menus: ["a"],
  activeTimePeriod: {
    open: "1",
    close: "1",
  },
};

const shortMenuMock = {
  name: "test",
  id: "test",
  thumbnailImage: "test",
  fullPrice: 1,
  discountedPercent: 1,
  discountedTimePeriod: {
    begin: "2024-02-01T10:00:00Z",
    end: "2024-02-01T14:00:00Z",
  },
  sold: 1,
  totalInStock: 1,
};

const fullMenuMock = {
  name: "1",
  id: "1",
  thumbnailImage: "1",
  fullPrice: 0,
  discountedPercent: 0,
  discountedTimePeriod: {
    begin: "1",
    end: "2",
  },
  sold: 0,
  totalInStock: 0,
  largeImage: "2",
  options: [
    {
      label: "test",
      choices: [{ label: "1" }, { label: "2" }, { label: "3" }],
    },
    {
      label: "test1",
      choices: [{ label: "2" }, { label: "3" }],
    },
  ],
};

describe("GET: /restaurant/:restaurantId", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });
  it("should return restaurant data", async () => {
    (restaurantService as jest.Mock).mockResolvedValue(restaurantMock);

    const response = await request(app).get("/restaurant/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(restaurantMock);
  });

  it("should work with catch", async () => {
    (restaurantService as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch data")
    );

    const result = await request(app).get("/restaurant/1");

    expect(result.status).toBe(500);
    expect(result.body).toEqual({ error: "Failed to fetch restaurant data" });
  });
});

describe("GET: /shortmenu/:restaurantId/:menuName", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });
  it("should return shortmenu restaurant data", async () => {
    (restaurantShortMenuService as jest.Mock).mockResolvedValue(shortMenuMock);

    const response = await request(app).get("/shortmenu/1/test");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(shortMenuMock);
  });

  it("should work with catch", async () => {
    (restaurantShortMenuService as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch data")
    );

    const result = await request(app).get("/shortmenu/1/test");

    expect(result.status).toBe(500);
    expect(result.body).toEqual({ error: "Failed to fetch restaurant data" });
  });
});

describe("GET: /fullmenu/:restaurantId/:menuName", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });
  it("should return fullmenu restaurant data", async () => {
    (restaurantFullMenuService as jest.Mock).mockResolvedValue(fullMenuMock);

    const response = await request(app).get("/fullmenu/1/test");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fullMenuMock);
  });

  it("should work with catch", async () => {
    (restaurantFullMenuService as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch data")
    );

    const result = await request(app).get("/fullmenu/1/test");

    expect(result.status).toBe(500);
    expect(result.body).toEqual({ error: "Failed to fetch restaurant data" });
  });
});
