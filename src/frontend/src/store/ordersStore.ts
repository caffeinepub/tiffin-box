import { create } from "zustand";

export interface Order {
  id: string;
  date: string;
  parentName: string;
  phone: string;
  childName: string;
  schoolName: string;
  classVal: string;
  rollNumber: string;
  day: string;
  foodItem: string;
  address: string;
  status: "pending" | "delivered";
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => Order;
  markDelivered: (id: string) => void;
  deleteOrder: (id: string) => void;
}

let idCounter = 1;

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  addOrder: (data) => {
    const order: Order = {
      ...data,
      id: String(idCounter++),
      date: new Date().toLocaleDateString("en-IN"),
      status: "pending",
    };
    set((state) => ({ orders: [...state.orders, order] }));
    return order;
  },
  markDelivered: (id) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status: "delivered" } : o,
      ),
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
    })),
}));
