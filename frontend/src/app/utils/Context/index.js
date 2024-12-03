'use client'
import { createContext, useState, useEffect} from 'react';
import { createCartData, getCartServerData } from '@/app/api/client/cart';
import { hasCookie,getCookie } from 'cookies-next';

export const MyContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartNoti, setCartNoti] = useState(localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).reduce((sum, item) => {
          return sum + (item.quantity || 0);
        }, 0)
      : 0);
  const [cartClient, setCartClient] = useState(localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")):[]);
  const [cartServer, setCartServer] = useState([]);
  useEffect(() => {
    if (hasCookie('token') && getCookie('role')== 'customer') {
      getCartServerData().then(res => console.log(res))
    }
    else if(cartClient!=[]){
      createCartData({items:cartClient}).then((res)=>console.log(res))
    }
  },[])

  return (
    <MyContext.Provider value={{ cartNoti, setCartNoti }}>
      {children}
    </MyContext.Provider>
  );
};