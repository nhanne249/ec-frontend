"use client";
import React, { useEffect, useState } from "react";
import withAuth from "@/app/configs/route";
import { getAllOrders } from "@/app/api/client/order";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
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

const OrderManagement = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [order, setOrder] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");

  const handleViewOrder = (order) => {
    setOrder(order);
    setMode("view");
    onOpen();
  };

  const fetchOrders = async () => {
    setLoading(true);
    await getAllOrders()
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => {
        setOrders([]);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="px-20 lg:px-30 2xl:px-40 pb-20">
      <h1 className="text-3xl font-bold text-center mb-10">Orders Management</h1>
      {/* Orders Table */}
      {(loading && mode === "") || orders.length > 0 ? (
        <Table aria-label="Order Table" css={{ height: "auto", minWidth: "100%" }}>
          <TableHeader>
            <TableColumn>User ID</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Payment Status</TableColumn>
            <TableColumn>Payment Method</TableColumn>
            <TableColumn>Total Amount</TableColumn>
            <TableColumn>Order Date</TableColumn>
            <TableColumn>Delivery Date</TableColumn>
            <TableColumn className="text-center">Action</TableColumn>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={`loading-row-${rowIndex}`}>
                    {Array.from({ length: 8 }).map((_, cellIndex) => (
                      <TableCell key={`loading-cell-${rowIndex}-${cellIndex}`}>
                        <Skeleton className="w-full h-6 rounded-lg" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : orders.length > 0 &&
                orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order?.userId}</TableCell>
                    <TableCell>{order?.status}</TableCell>
                    <TableCell>{order?.paymentStatus}</TableCell>
                    <TableCell>{order?.paymentMethod}</TableCell>
                    <TableCell className="text-green-500 font-medium">{`$${order?.totalAmount.toFixed(2)}`}</TableCell>
                    <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>{order?.deliveryDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <div className="flex flex-row space-x-2 justify-center">
                        <Button onClick={() => handleViewOrder(order)} size="sm">
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      ) : (
        <div>No orders found</div>
      )}

      {order && mode !== "delete" && (
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

export default withAuth(OrderManagement, ["admin"]);
