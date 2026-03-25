import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Subscriber {
    subscribedAt: bigint;
    email: string;
}
export type ProductId = bigint;
export interface UserProfile {
    name: string;
    email: string;
}
export interface Product {
    inStock: boolean;
    name: string;
    description: string;
    productId: ProductId;
    imageUrl: string;
    category: string;
    price: number;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<ProductId>;
    addSubscriber(email: string): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(productId: ProductId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(productId: ProductId): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getSubscribers(): Promise<Array<Subscriber>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProduct(productId: ProductId, product: Product): Promise<void>;
}
