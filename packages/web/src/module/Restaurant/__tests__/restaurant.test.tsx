import React from "react";
import {
  act,
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import Restaurant from "../Restaurant";
import { IFullMenu, IRestaurant, IShortMenu } from "../../../model/restaurant";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRestaurant: IRestaurant = {
  name: "Mock Restaurant",
  id: 123,
  coverImage: "https://example.com/image.jpg",
  menus: ["Menu 1"],
  activeTimePeriod: {
    open: "08:00",
    close: "22:00",
  },
};

const mockShortMenu: IShortMenu = {
  name: "Menu 1",
  id: "Menu 1",
  thumbnailImage: "https://example.com/spaghetti-thumbnail.jpg",
  fullPrice: 12.99,
  discountedPercent: 20,
  discountedTimePeriod: {
    begin: "2025-01-01",
    end: "2025-01-31",
  },
  sold: 100,
  totalInStock: 50,
};

const mockFullMenu: IFullMenu = {
    name: "Special Menu",
    id: "menu123",
    thumbnailImage: "https://example.com/thumbnail.jpg", // Optional field
    fullPrice: 1500,
    discountedPercent: 20,
    discountedTimePeriod: {
      begin: "2025-01-01T00:00:00Z",
      end: "2025-12-31T23:59:59Z",
    },
    sold: 500,
    totalInStock: 200,
    largeImage: "https://example.com/large-image.jpg", // Optional field
    options: [
      {
        label: "Size",
        choices: [
          { label: "Small" },
          { label: "Medium" },
          { label: "Large" },
        ],
      },
      {
        label: "Topping",
        choices: [
          { label: "Cheese" },
          { label: "Bacon" },
          { label: "Avocado" },
        ],
      },
    ],
  };

describe("Restaurant", () => {
  it("should render correctly", () => {
    act(() => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockRestaurant });
    });
    const { getByTestId } = render(<Restaurant />);
    const selectElement = getByTestId("restautant");
    expect(selectElement).not.toBeNull();
  });

  it("should render error screen", async () => {
    act(() => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: 500,
          data: { message: "Internal Server Error" },
        },
      });
    });
    render(<Restaurant />);
    expect(await screen.findByText("No results found")).not.toBeNull();
  });

  it("should display image correctly", async () => {
    act(() => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockRestaurant });
    });

    waitFor(() => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockShortMenu });
    });
    const { findByTestId } = render(<Restaurant />);
    const selectElement = await findByTestId("image0")

    expect(selectElement).not.toBeNull();
  });

  it("should search correctly", async () => {
    act(() => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockRestaurant });
    });

    waitFor(() => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockShortMenu });
    });
    const { findByTestId } = render(<Restaurant />);
    const selectElement = (await findByTestId("restaurant-search")).querySelector('input')

    act(() => {
        fireEvent.change(selectElement as Element, {target: {value: 'Menu1'}})
    })

    expect(selectElement?.value).toBe('Menu1');
  });

  it("should display detail modal correctly and can closed the modal", async () => {
    waitFor(() => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockRestaurant });
    });

    waitFor(() => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockShortMenu });
    });

    waitFor(() => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockFullMenu });
    });
    const { findByTestId } = render(<Restaurant />);
    const selectElement = await findByTestId("menu-0")

    act(() => {
        fireEvent.click(selectElement)
    })

    const selectModalElement = await findByTestId("menu-detail-modal")
    expect(selectModalElement).not.toBeNull()

    const closeButton =  (await findByTestId("menu-detail-modal-closed"))

    act(() => {
        fireEvent.click(closeButton as Element)
        
    })

    waitFor(() => {
        expect(selectModalElement).toBeNull()
    })

  });
});