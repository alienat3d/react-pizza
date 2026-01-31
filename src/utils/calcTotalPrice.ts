import {Items} from "../redux/slices/cartSlice"

export const calcTotalPrice = (items: Items[]) =>
    items.reduce((sum, obj) => (obj.price * obj.amount) + sum, 0)