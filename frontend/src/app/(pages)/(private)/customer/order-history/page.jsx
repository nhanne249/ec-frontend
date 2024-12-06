"use client";
import React, { useState, useEffect } from "react";
import withAuth from "@/app/configs/route";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  ModalContent,
  useDisclosure,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  getKeyValue,
  Chip,
  Image,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import { getAllProducts } from "@/app/api/client/products";
import { getAllOrders } from "@/app/api/client/order";

// Format Currency here - Reusable for other places
const formatCurrency = (value, locale = "vi-VN", currency = "VND") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const OrderHistory = () => {
  // Fetch orders
  const [orders, setOrders] = useState();
  useEffect(() => {
    getAllOrders()
      .then((response) => setOrders(response.results))
      .catch((error) => {
        console.error("Error fetching product data: ", error);
      });
  }, []);
  const sampleOrders = [
    {
      paymentInfo: null,
      _id: "674cddfa04c30a3850e584b7",
      userId: "6747ebdb344615bfa14a621c",
      items: [
        {
          productId: "67230e7844b2afb65fce04bc",
          quantity: 1,
          price: 10000,
          _id: "674cddfa04c30a3850e584b8",
        },
      ],
      status: "Pending",
      paymentStatus: "Pending",
      paymentMethod: "Credit Card",
      totalAmount: 10000,
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        _id: "674cddfa04c30a3850e584b9",
      },
      orderDate: "2024-12-01T22:06:50.276Z",
      deliveryDate: "2024-11-28T01:35:02.850Z",
      createdAt: "2024-12-01T22:06:50.296Z",
      updatedAt: "2024-12-01T22:06:51.168Z",
      __v: 0,
    },
    {
      paymentInfo: null,
      _id: "674cde2a04c30a3850e584c2",
      userId: "6747ebdb344615bfa14a621c",
      items: [
        {
          productId: "67230e7844b2afb65fce04bc",
          quantity: 5,
          price: 10000,
          _id: "674cde2a04c30a3850e584c3",
        },
      ],
      status: "Pending",
      paymentStatus: "Pending",
      paymentMethod: "Credit Card",
      totalAmount: 50000,
      shippingAddress: {
        street: "Ta Quang Buu",
        city: "Thu Duc",
        state: "Ho Chi Minh",
        zipCode: "12345",
        country: "Vietnam",
        _id: "674cde2a04c30a3850e584c4",
      },
      orderDate: "2024-12-01T22:07:38.572Z",
      deliveryDate: "2024-11-28T01:35:02.850Z",
      createdAt: "2024-12-01T22:07:38.592Z",
      updatedAt: "2024-12-01T22:07:39.434Z",
      __v: 0,
    },
    {
      _id: "6752b0869c2c1337fa6a34f3",
      userId: "6747ebdb344615bfa14a621c",
      items: [
        {
          productId: "67230e7844b2afb65fce04bc",
          quantity: 10,
          price: 100,
          _id: "6752b0869c2c1337fa6a34f4",
        },
      ],
      status: "PENDING",
      paymentStatus: "PENDING",
      paymentInfo:
        '{"bin":"970448","accountNumber":"CAS004100037486007","accountName":"HA VAN CHAU","amount":1000,"description":"CSYJ4CX5OX6 Thanh toan phi mua hang","orderCode":184763342,"currency":"VND","paymentLinkId":"0c46d456703a41fea8cdac9ba88296fd","status":"PENDING","checkoutUrl":"https://pay.payos.vn/web/0c46d456703a41fea8cdac9ba88296fd","qrCode":"00020101021238620010A000000727013200069704480118CAS0041000374860070208QRIBFTTA5303704540410005802VN62390835CSYJ4CX5OX6 Thanh toan phi mua hang63049C55"}',
      paymentMethod: "PAYPAL",
      totalAmount: 1000,
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        _id: "6752b0869c2c1337fa6a34f5",
      },
      orderDate: "2024-12-06T08:06:30.400Z",
      createdAt: "2024-12-06T08:06:30.402Z",
      updatedAt: "2024-12-06T08:06:30.960Z",
      __v: 0,
    },
    {
      _id: "6752b0eb16aee0e3c5ef9878",
      userId: "6747ebdb344615bfa14a621c",
      items: [
        {
          productId: "67230e7844b2afb65fce04bc",
          quantity: 10,
          price: 100,
          _id: "6752b0eb16aee0e3c5ef9879",
        },
      ],
      status: "PENDING",
      paymentStatus: "PENDING",
      paymentInfo:
        '{"bin":"970448","accountNumber":"CAS004100037486007","accountName":"HA VAN CHAU","amount":1000,"description":"CSWXJOO3KM3 Thanh toan phi mua hang","orderCode":593793809,"currency":"VND","paymentLinkId":"7878b9f95f864ac78a2382f33e54e6b0","status":"PENDING","checkoutUrl":"https://pay.payos.vn/web/7878b9f95f864ac78a2382f33e54e6b0","qrCode":"00020101021238620010A000000727013200069704480118CAS0041000374860070208QRIBFTTA5303704540410005802VN62390835CSWXJOO3KM3 Thanh toan phi mua hang6304DC6C"}',
      paymentMethod: "PAYPAL",
      totalAmount: 1000,
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        _id: "6752b0eb16aee0e3c5ef987a",
      },
      orderDate: "2024-12-06T08:08:11.074Z",
      createdAt: "2024-12-06T08:08:11.083Z",
      updatedAt: "2024-12-06T08:08:11.608Z",
      __v: 0,
    },
  ];

  const [productData, setProductData] = useState();
  useEffect(() => {
    getAllProducts("")
      .then((response) => {
        console.log(response.results);
        setProductData(response.results);
      })
      .catch((error) => {
        console.error("Error fetching product data: ", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <Table
        aria-label="Order Table"
        css={{ height: "auto", minWidth: "100%" }}
      >
        <TableHeader>
          <TableColumn className="font-bold ">Products</TableColumn>
          <TableColumn className="font-bold text-center">Status</TableColumn>
          <TableColumn className="font-bold text-center">
            Payment Status
          </TableColumn>
          <TableColumn className="font-bold text-center">
            Payment Method
          </TableColumn>
          <TableColumn className="font-bold text-right">
            Total Amount
          </TableColumn>
          <TableColumn className="font-bold text-center">
            Order Date
          </TableColumn>
          <TableColumn className="font-bold text-center">
            Delivery Date
          </TableColumn>
          <TableColumn className="font-bold text-center">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {/* TODO: Change sampleOrders to orders from API */}
          {orders?.map((order, index) => (
            <TableRow key={index}>
              <TableCell className="flex gap-2 items-center">
                <div>
                  <Image
                    width={200}
                    src={
                      productData?.find(
                        (p) => p._id == order.items[0].productId
                      ).images[0]
                    }
                  />
                </div>
                <div>
                  <div className="font-semibold">
                    {
                      productData?.find(
                        (p) => p._id == order.items[0].productId
                      ).name
                    }
                  </div>
                  <div className="text-xs text-gray-500 font-semibold">
                    {" "}
                    +{order.items.length - 1} products
                  </div>
                </div>
              </TableCell>
              {/* TODO: Maybe we can have 1 component for this? */}
              <TableCell className="text-center">
                <Chip className="capitalize">{order.status.toLowerCase()}</Chip>
              </TableCell>
              <TableCell className="text-center">
                <Chip className="capitalize">
                  {order.paymentStatus.toLowerCase()}
                </Chip>
              </TableCell>
              <TableCell className="capitalize text-center">
                {order.paymentMethod.toLowerCase()}
              </TableCell>
              <TableCell className="text-green-500 font-medium text-right">{`${formatCurrency(
                order.totalAmount
              )}`}</TableCell>
              <TableCell className="text-center">
                {order.orderDate.split("T")[0]}
              </TableCell>
              <TableCell className="text-center">
                {order.deliveryDate?.split("T")[0]}
              </TableCell>
              <TableCell>
                <div className="flex flex-row space-x-2 justify-center">
                  <Button
                    // TODO: Redirect to Order Details page
                    onClick={() => redirect(`/orders/${order._id}`)}
                    size="sm"
                  >
                    Details
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default withAuth(OrderHistory, ["customer"]);
