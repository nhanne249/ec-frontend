"use client";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { MyContext } from "@/app/utils/Context";
import { Button, Input } from "@nextui-org/react";
import { getVoucherByCode } from "@/app/api/client/voucher";
import { createOrder } from "@/app/api/client/order";

const Order = () => {
  const { cartServer, cartNoti } = useContext(MyContext);

  const [voucher, setVoucher] = useState("");
  const [total, setTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cartServer.reduce((sum, item) => {
        return sum + item.quantity * Number(item.price);
      }, 0)
    );
    setFinalTotal(
      cartServer.reduce((sum, item) => {
        return sum + item.quantity * Number(item.price);
      }, 0)
    );
  }, [cartServer]);
  const debounceFetchVoucher = debounce((value) => {
    setVoucher(value);
    if (value) {
      getVoucherByCode(value).then((res) => {
        if (res[0].discount * total > res[0].maxDiscountPrice) setFinalTotal(total - res[0].maxDiscountPrice);
        else setFinalTotal(total - (res[0].discount * total) / 100);
      });
    } else {
      setFinalTotal(total);
    }
  }, 2000);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = {
      items: cartServer.map((item) => ({
        ...item,
        productId: item._id,
      })),
      paymentMethod: "PAYPAL",
      shippingAddress: {
        street: e.target[0].value,
        city: e.target[1].value,
        zipCode: e.target[2].value,
        state: e.target[3].value,
        country: e.target[4].value,
      },
      voucherCode: voucher,
    };
    createOrder(dataSend).then((res) => {
      console.log(res);
      if (res.order.paymentInfo) {
        window.location.href = JSON.parse(res.order.paymentInfo).checkoutUrl;
      }
      // localStorage.setItem("cart", JSON.stringify(cart));
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full px-10 py-5 grid grid-cols-5 grid-rows-1 gap-4">
      <div className="col-span-4 flex flex-col gap-5">
        <div className="flex flex-col border rounded-lg py-5 h-fit bg-white">
          <div className="px-2 pb-2 mb-4 font-medium text-4xl border-b w-1/2 text-gray-600">Order's detail</div>
          <div className="px-2 pb-2 grid grid-cols-12 grid-rows-1 mb-4 border-b">
            <div className="col-span-6 font-medium text-2xl text-gray-600">Item</div>
            <div className="col-span-2 col-start-7 font-medium text-2xl text-gray-600 text-center">Cost</div>
            <div className="col-span-2 col-start-9 font-medium text-2xl text-gray-600 text-center">Amount</div>
            <div className="col-span-2 col-start-11 font-medium text-2xl text-gray-600 text-center">Subtotal</div>
          </div>
          {cartServer.map((item) => {
            return (
              <div key={item._id} className="w-auto h-20 grid grid-cols-12 grid-rows-1 gap-4 mb-3 mx-3 border-b">
                <img className="w-16 min-w-16 h-16 place-content-center" src={item.images[0]} alt="" />
                <div className="text-xl text-green-800 font-semibold col-span-5 place-content-center">{item.name}</div>
                <div className="text-base text-red-600 font-semibold col-span-2 col-start-7 place-content-center text-center">
                  {String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
                </div>
                <div className="text-xl text-slate-800 font-semibold col-span-2 col-start-9 place-content-center text-center">{item.quantity}</div>
                <div className="text-xl text-slate-800 font-semibold col-span-2 col-start-11 place-content-center text-center">
                  {(item.quantity * Number(item.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col border rounded-lg py-5 h-fit bg-white">
          <div className="px-2 pb-2 mb-4 font-medium text-4xl border-b w-1/2 text-gray-600">Shipping detail</div>
          <div className="w-full h-auto flex flex-col gap-3 px-2">
            <div className="flex flex-row gap-5">
              <Input isRequired type="text" name="street" label="Street" className="" isClearable />
              <Input isRequired type="text" name="city" label="City" className="" isClearable />
            </div>
            <div className="flex flex-row gap-5">
              <Input isRequired type="text" name="zipCode" label="Zipcode" className="" isClearable />
              <Input isRequired type="text" name="state" label="State" className="" isClearable />
              <Input isRequired type="text" name="country" label="Country" className="" isClearable />
            </div>
          </div>
        </div>
      </div>
      <div className="h-fit col-start-5 min-w-80 bg-white rounded-xl flex flex-col justify-center p-5 gap-5 border">
        <div className="w-full flex flex-col justify-center gap-5 pb-5 border-b border-gray-400">
          <div className="text-2xl font-bold text-red-600 text-center">Your order</div>
          <div className="flex flex-row justify-between gap-5">
            <div className="text-lg font-medium text-sky-800">Quantity:</div>
            <div className="text-lg font-medium w-32">{cartNoti}</div>
          </div>
          <div className="flex flex-row justify-between gap-5">
            <div className="text-lg font-medium text-sky-800">Total:</div>
            <div className="text-lg font-medium w-32">{String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</div>
          </div>
          <div className="flex flex-row justify-between gap-5">
            <div className="text-lg font-medium text-sky-800">Voucher:</div>
            <Input type="text" name="voucher" className="text-lg font-medium w-32" isClearable onChange={(e) => debounceFetchVoucher(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-row justify-between gap-5">
          <div className="text-lg font-medium text-sky-800">Final total:</div>
          <div className="text-lg font-medium w-32">{String(finalTotal).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</div>
        </div>
        <Button
          className="self-center w-52 h-12 z-10 mb-5 bg-sky-600 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
          type="submit"
        >
          Order
        </Button>
      </div>
    </form>
  );
};
export default Order;

function debounce(func, delay) {
  let timer;
  return function (...args) {
    const context = this;

    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
