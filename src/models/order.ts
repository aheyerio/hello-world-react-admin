import {OrderItem} from "./order-item"

export interface Order {
    id: number;
    name: string;
    email: string;
    total: string;
    order_items: OrderItem[];
}