import { useState } from "react"

const useMenu = () => {
    const [shopId, setShopId] = useState<number | null>()

    const onSetShopId = (shopId: number | null) => {
        setShopId(shopId)
    }

    return {
        IsSelectShopName: !!shopId,
        shopId,
        onSetShopId
    }
}

export default useMenu