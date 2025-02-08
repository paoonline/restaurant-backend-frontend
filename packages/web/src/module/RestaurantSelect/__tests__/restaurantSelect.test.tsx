import React from "react"
import { act, fireEvent, render } from "@testing-library/react";
import RestaurantSelect from "../RestaurantSelect";

describe('RestaurantSelect', () => {
    it('should select menu correctly', () => {
        const mockCallback = jest.fn();
        const { getByTestId } = render(<RestaurantSelect callback={mockCallback} />);

        const selectElement = getByTestId("567051_select");

        act(() => {
            fireEvent.click(selectElement);
        })
        expect(mockCallback).toHaveBeenCalled();
        expect(mockCallback).toHaveBeenCalledWith(567051);
    })
})