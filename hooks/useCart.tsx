"use client"

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    thumbnailUrl?: string;
    description?: string;
}


const saveToCart = (cart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}


const getCartItems = async (): Promise<CartItem[]> => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

const updateCartMutation = async (newCart: CartItem[]) => {
    saveToCart(newCart)
    return newCart;
}



export function useShoppingCart() {


    const queryClient = useQueryClient()


    const { data: cartItems, isLoading } = useQuery<CartItem[]>({
        queryKey: ['cart'],
        queryFn: getCartItems
    });

    const { mutateAsync: updateCartMutationAsync } = useMutation({
        mutationFn: updateCartMutation,
        onSuccess: () => {
            console.log("onSuccess");
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        }
    })


    const addToCart = async (item: CartItem) => {

        console.log("calling addToCart")

        const existingItem = cartItems?.find((cartItem) => cartItem.id === item.id);
        console.log("before", cartItems)
        if (existingItem) {
            console.log("existingItem: " + existingItem)
            const newCartItems = (cartItems || []).map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)

            console.log("newCartItems", newCartItems)

            await updateCartMutationAsync(newCartItems)
        } else {
            console.log("not: " + existingItem)
            const newCartItems = [...(cartItems || []), { ...item, quantity: 1 }];

            await updateCartMutationAsync(newCartItems)
        }
    }


    const removeFromCart = async (itemId: string) => {
        const newCartItems = (cartItems || []).filter(item => item.id !== itemId);
        await updateCartMutationAsync(newCartItems)
    }

    const updateQuantity = async (itemId: string, newQuantity: number) => {

        const newCartItems = (cartItems || []).map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);

        await updateCartMutationAsync(newCartItems)

    }

    const getTotalPrice = () => {

        return (cartItems || []).reduce((total, item) => total + item.price * item.quantity, 0);

    }

    const clearCart = async () => {
        await updateCartMutationAsync([])
    }


    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        clearCart
    }










}