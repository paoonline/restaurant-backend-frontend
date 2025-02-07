import { useState } from "react"

const useMenu = () => {
    const [shopId, setShopId] = useState<number>()

    const onSetShopId = (shopId: number) => {
        setShopId(shopId)
    }

    return {
        IsSelectShopName: !!shopId,
        shopId,
        onSetShopId
    }
}

export default useMenu