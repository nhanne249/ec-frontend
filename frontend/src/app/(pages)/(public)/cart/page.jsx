"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";
import { toast } from "react-toastify";
import { MyContext } from "@/app/utils/Context";
import { Button } from "@nextui-org/react";

const Cart = () => {
  const router = useRouter();
  const { role, cartServer, cartNoti, setCartClient, setNeedFetch } = useContext(MyContext);

  const [total, setTotal] = useState(
    cartServer.reduce((sum, item) => {
      return sum + item.quantity * Number(item.price);
    }, 0)
  );
  useEffect(() => {
    if (role === "customer") setNeedFetch(true);
  }, [cartServer]);

  useEffect(() => {
    setTotal(
      cartServer.reduce((sum, item) => {
        return sum + item.quantity * Number(item.price);
      }, 0)
    );
  }, [cartServer]);
  const handleClickAdd = (id) => {
    setCartClient((prevCart) => {
      const existingProduct = prevCart.find((item) => item.productId === id);

      if (existingProduct) {
        return prevCart.map((item) => (item.productId === id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevCart, { id: id, quantity: 1 }];
      }
    });
  };
  const handleClickMinus = (id) => {
    setCartClient((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.productId === id) {
            const updatedQuantity = item.quantity - 1;
            if (updatedQuantity <= 0) {
              return null;
            }
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleChangeQuantity = ({ id }, value = 0) => {
    setCartClient((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId === id) {
          return { ...item, quantity: Math.max(value, 0) };
        }
        return item;
      });
    });
  };

  const handleClickCheckout = () => {
    if (role == "customer") router.push("/order");
    else {
      toast.warning("You need to signin before checkout!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/login");
    }
  };

  const handleDeleteProductFromCart = ({ id }) => {
    setCartClient((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.productId == id) {
            return null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  return cartServer.length != 0 ? (
    <div className="w-full h-full px-10 py-5 grid grid-cols-5 grid-rows-1 gap-4">
      <div className="col-span-4 flex flex-col border rounded-lg py-5 h-fit bg-white">
        {cartServer.map((item) => {
          return (
            <div key={item._id} className="w-auto h-20 grid grid-cols-10 grid-rows-1 gap-4 mx-3 border-b">
              <Image className="w-16 min-w-16 h-16" src={item.images[0]} alt="" />
              <div className="col-span-5 flex flex-col gap-1">
                <div className="text-xl text-sky-800 font-semibold">{item.name}</div>
                <div className="text-base text-red-600 font-semibold">{String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</div>
              </div>
              <div className="col-span-2 col-start-7 flex flex-row justify-center items-center gap-0">
                <button className="border border-e-0 w-10 h-10 p-0 rounded-s-lg" onClick={() => handleClickAdd(item._id)}>
                  +
                </button>
                <input
                  type="number"
                  className="rounded-none h-10 w-10 border text-center content-center"
                  value={item.quantity}
                  onChange={(value) => {
                    handleChangeQuantity({ id: item._id }, value);
                  }}
                />
                <button className="border border-s-0 w-10 h-10 p-0 rounded-e-lg" onClick={() => handleClickMinus(item._id)}>
                  -
                </button>
              </div>
              <div
                className="col-span-2 h-fit col-start-9 text-base cursor-pointer underline text-red-600 self-center"
                onClick={() => handleDeleteProductFromCart({ id: item._id })}
              >
                Delete this product!
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-fit col-start-5 min-w-80 bg-white rounded-xl flex flex-col justify-center p-5 gap-5 border">
        <div className="w-full flex flex-col justify-center gap-5 pb-5 border-b border-gray-400">
          <div className="text-2xl font-bold text-red-600 text-center">Checkout</div>
          <div className="flex flex-row justify-between gap-5">
            <div className="text-lg font-medium text-sky-800">Quantity:</div>
            <div className="text-lg font-medium w-32">{cartNoti}</div>
          </div>
          <div className="flex flex-row justify-between gap-5">
            <div className="text-lg font-medium text-sky-800">Total:</div>
            <div className="text-lg font-medium w-32">{String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</div>
          </div>
        </div>

        <Button
          className="self-center w-52 h-12 z-10 mb-5 bg-sky-600 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
          onClick={() => handleClickCheckout()}
        >
          Checkout
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full h-full px-10 py-5 text-xl text-sky-800 font-semibold">No item in cart!</div>
  );
};

export default Cart;
