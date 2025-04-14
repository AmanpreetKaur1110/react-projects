import { createContext, useState, useEffect } from "react";
import CartItem from "../components/cart-item/cart-item.component";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((CartItem) => CartItem.id === productToAdd.id);

    // if found , increment quantity
    if(existingCartItem){
        return cartItems.map((CartItem) => CartItem.id === productToAdd.id ?
         {...CartItem, quantity: CartItem.quantity + 1}
         :CartItem
        );
    }

    // return new array with modified cartitems
    return [...cartItems,{...productToAdd,quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (CartItem) => CartItem.id === cartItemToRemove.id
    );

    if(existingCartItem.quantity===1){
        return cartItems.filter((CartItem) => CartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((CartItem) => CartItem.id === cartItemToRemove.id ?
         {...CartItem, quantity: CartItem.quantity - 1}
         :CartItem
        );

};

const clearCartItem = (cartItems, cartItemToClear) =>  cartItems.filter((cartItem)=>cartItem.id !==  cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount:0,
    cartTotal:0,
});

export const CardProvider = ({ children}) => {
    const[isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, CartItem) => total + CartItem.quantity, 0)
        setCartCount(newCartCount);
    },[cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, CartItem) => total + CartItem.quantity * CartItem.price, 0);
        setCartTotal(newCartTotal);
    },[cartItems])

    const addItemToCart = (productToAdd) => {
       setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart  = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
     }

     const clearItemFromCart  = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
     }
 

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart,  cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
  }