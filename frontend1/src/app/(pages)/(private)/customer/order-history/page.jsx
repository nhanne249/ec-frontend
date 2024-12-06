"use client";
import React, { useState, useEffect } from "react";
import withAuth from "@/app/configs/route";
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrderHistory = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState({});

  useEffect(() => {
    getAllOrders().then((response) => {
      setOrders(response);
    });
  }, []);
  const handleViewOrder = (order) => {
    setOrder(order);
    onOpen();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <Table aria-label="Order Table" css={{ height: "auto", minWidth: "100%" }}>
        <TableHeader>
          <TableColumn className="font-bold ">Products</TableColumn>
          <TableColumn className="font-bold text-center">Status</TableColumn>
          <TableColumn className="font-bold text-center">Payment Status</TableColumn>
          <TableColumn className="font-bold text-center">Payment Method</TableColumn>
          <TableColumn className="font-bold text-right">Total Amount</TableColumn>
          <TableColumn className="font-bold text-center">Order Date</TableColumn>
          <TableColumn className="font-bold text-center">Delivery Date</TableColumn>
          <TableColumn className="font-bold text-center">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {/* TODO: Change sampleOrders to orders from API */}
          {orders?.map((order) => {
            return (
              <TableRow key={order._id}>
                <TableCell className="flex gap-2 items-center">
                  <div className="font-semibold">{order._id}</div>
                </TableCell>
                {/* TODO: Maybe we can have 1 component for this? */}
                <TableCell className="text-center">
                  <Chip className="capitalize">{order.status.toLowerCase()}</Chip>
                </TableCell>
                <TableCell className="text-center">
                  <Chip className="capitalize">{order.paymentStatus.toLowerCase()}</Chip>
                </TableCell>
                <TableCell className="capitalize text-center">{order.paymentMethod.toLowerCase()}</TableCell>
                <TableCell className="text-green-500 font-medium text-right">{`${formatCurrency(order.totalAmount)}`}</TableCell>
                <TableCell className="text-center">{order.orderDate.split("T")[0]}</TableCell>
                <TableCell className="text-center">{order.deliveryDate?.split("T")[0]}</TableCell>
                <TableCell>
                  <div className="flex flex-row space-x-2 justify-center">
                    <Button onClick={() => handleViewOrder(order)} size="sm">
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {order && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Order Details
                  <p className="text-small text-default-500">Order ID: {order._id}</p>
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold">User Information</h4>
                      <p>User ID: {order.userId}</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Order Status</h4>
                      <p>Status: {order.status}</p>
                      <p>Payment Status: {order.paymentStatus}</p>
                      <p>Payment Method: {order.paymentMethod}</p>
                    </div>
                  </div>

                  <Divider />

                  {/* Chi tiết sản phẩm */}
                  <div>
                    <h4 className="font-bold mb-2">Order Items</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between mb-2">
                        <span>Product ID: {item.productId}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: {formatCurrency(item.price)}</span>
                      </div>
                    ))}
                  </div>

                  <Divider />

                  {/* Địa chỉ giao hàng */}
                  <div>
                    <h4 className="font-bold">Shipping Address</h4>
                    <p>{order.shippingAddress.street}</p>
                    <p>{`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>

                  <Divider />

                  {/* Thời gian đơn hàng */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold">Order Date</h4>
                      <p>{formatDate(order.orderDate)}</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Delivery Date</h4>
                      <p>{formatDate(order.deliveryDate)}</p>
                    </div>
                  </div>

                  {/* Tổng giá trị */}
                  <div className="text-right mt-4">
                    <h3 className="text-xl font-bold">Total Amount: {formatCurrency(order.totalAmount)}</h3>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default withAuth(OrderHistory, ["customer"]);
