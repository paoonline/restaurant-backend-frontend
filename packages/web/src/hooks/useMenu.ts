import { useState } from "react"

const useMenu = () => {
    const [restaurantId, setRestaurantId] = useState<number | null>()

    const onSetRestaurantId = (id: number | null) => {
        setRestaurantId(id)
    }

    return {
        IsSelectShopName: !!restaurantId,
        restaurantId,
        onSetRestaurantId
    }
}

export default useMenu