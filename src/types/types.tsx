export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    quantity: number | null;
};

export interface Rating {
    rate: number;
    count: number;
};

export type Category = string[];

export interface UserAuthContext {
    isAuthenticated: boolean;
    loading: boolean;
    username: string | null;
    login: (username: string, password: string) => Promise<{ success: boolean, message: string }>;
    logout: () => void;
};

export type CartState = {
    cart: Product[];
};

export type CartAction =
    | { type: 'INIT_CART'; cart: Product[] }
    | { type: 'ADD_TO_CART'; product: Product }
    | { type: 'REMOVE_FROM_CART'; productId: number }
    | { type: 'UPDATE_ITEM_QUANTITY'; productId: number; quantity: number }
    | { type: 'CLEAR_CART' };