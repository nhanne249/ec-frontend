'use client'
import { createContext, useState, useEffect} from 'react';
import { createCartData, getCartServerData,getCartDataNoLogin } from '@/app/api/client/cart';
import { hasCookie,getCookie } from 'cookies-next';

export const MyContext = createContext();

export const CartProvider = ({ children }) => {

  const [role, setRole] = useState(hasCookie('role')? getCookie('role'):'guest')
  const [cartNoti, setCartNoti] = useState(typeof window !== 'undefined' && localStorage.getItem("cart")
      ? JSON.parse(typeof window !== 'undefined' && localStorage.getItem("cart")).reduce((sum, item) => {
          return sum + (item.quantity || 0);
        }, 0)
      : 0);
  const [cartClient, setCartClient] = useState(typeof window !== 'undefined' && localStorage.getItem("cart")
      ? JSON.parse(typeof window !== 'undefined' && localStorage.getItem("cart")):[]);
  const [cartServer, setCartServer] = useState([]);
  const [needFetch, setNeedFetch] = useState(false);
    useEffect(() => {
    if (hasCookie('token') && getCookie('role')== 'customer' && cartClient.length ===0 ) {
      getCartServerData().catch(res => {
        if(!res.response.data.error){
        setCartServer(res.response.data.items.reverse()); setNeedFetch(true)}
      })
    }
    else if (hasCookie('token') && getCookie('role') == 'customer' && cartClient.length > 0) {
      createCartData({items:cartClient}).then((res)=>{setCartServer(res.productsInfo.items.reverse()); setNeedFetch(true)})
    }
    else if(cartClient!=[]){
      getCartDataNoLogin({ items: cartClient }).then((res) => { setCartServer(res.items.reverse()); setNeedFetch(true)})
    }
    }, [needFetch])
  
  useEffect(()=>{setCartClient(typeof window !== 'undefined' && localStorage.getItem("cart")
    ? JSON.parse(typeof window !== 'undefined' && localStorage.getItem("cart")) : []);
  }, [cartNoti])
  
  useEffect(() => {
    if (cartClient.length != cartServer.length) setNeedFetch(false);
  }, [cartClient]);

  useEffect(() => {
    typeof window !== 'undefined' && localStorage.setItem("cart", JSON.stringify(cartClient));

    setCartServer((prevCartServer) =>
      prevCartServer
        .map((item, index) => {
          if (!cartClient[index]) {
            return null;
          }
          return { ...item, quantity: cartClient[index].quantity };
        })
        .filter(Boolean)
    );
    setCartNoti(
      cartClient.reduce((sum, item) => {
        return sum + (item.quantity || 0);
      }, 0)
    );
  }, [cartClient]);
  return (
    <MyContext.Provider value={{ cartNoti, setCartNoti,role,setRole,cartServer,setCartClient,setNeedFetch   }}>
      {children}
    </MyContext.Provider>
  );
};