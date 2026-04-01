import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderDTO {
    id: bigint;
    day: string;
    status: string;
    class: string;
    rollNumber: string;
    address: string;
    timestamp: bigint;
    phone: string;
    childName: string;
    parentName: string;
    foodItem: string;
    schoolName: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteMultipleOrders(orderIds: Array<bigint>): Promise<void>;
    deleteOrder(id: bigint): Promise<void>;
    getAllOrders(): Promise<Array<OrderDTO>>;
    getCallerUserRole(): Promise<UserRole>;
    getDeliveredOrders(): Promise<Array<OrderDTO>>;
    getOrderById(id: bigint): Promise<OrderDTO>;
    getPendingOrders(): Promise<Array<OrderDTO>>;
    isCallerAdmin(): Promise<boolean>;
    markOrderAsDelivered(id: bigint): Promise<void>;
    placeOrder(order: OrderDTO): Promise<bigint>;
}
