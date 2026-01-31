import {calcTotalPrice} from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []

    // Calculate totals to prevent "0" showing on refresh
    const totalPrice = calcTotalPrice(items)

    const totalItems = items.reduce((sum: number, obj: any) => obj.amount + sum, 0)

    return {
        items,
        totalPrice,
        totalItems,
    };
};