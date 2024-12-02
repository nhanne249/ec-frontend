"use client";
import React, { useEffect, useState } from "react";
import withAuth from "@/app/configs/route";
import {
  getAllOrders,
  getOrderById,
  createOrder,
} from "@/app/api/client/order";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
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
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const OrderManagement = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [order, setOrder] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });
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

  const handleAddOrder = () => {};

  const handleChangeOrder = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setOrder((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setOrder((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log("Orders: ", orders);

  return (
    <div className="px-20 lg:px-30 2xl:px-40 pb-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        Orders Management
      </h1>
      {/* Orders Table */}
      {(loading && mode === "") || orders.length > 0 ? (
        <Table
          aria-label="Order Table"
          css={{ height: "auto", minWidth: "100%" }}
        >
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
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell className="text-green-500 font-medium">{`$${order.totalAmount.toFixed(
                      2
                    )}`}</TableCell>
                    <TableCell>{order.orderDate.split("T")[0]}</TableCell>
                    <TableCell>{order.deliveryDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <div className="flex flex-row space-x-2 justify-center">
                        <Button
                          onClick={() => handleViewOrder(order)}
                          size="sm"
                        >
                          Details
                        </Button>
                        {/* NOTE: Currently doesn't have API for editing & deleting */}
                        {/* <Button
                          onClick={() => {
                            handleEditOrder(order);
                          }}
                          size="sm"
                          color="success"
                          className="text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            handleDeleteOrder(order);
                          }}
                          size="sm"
                          color="danger"
                        >
                          Delete
                        </Button> */}
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
        // <Modal
        //   isOpen={isOpen}
        //   onOpenChange={onOpenChange}
        //   size="4xl"
        //   scrollBehavior="inside"
        // >
        //   <ModalContent>
        //     {(onClose) => (
        //       <>
        //         <ModalHeader className="flex flex-col gap-1 text-center">
        //           {mode === "edit"
        //             ? "Update Order"
        //             : mode === "view"
        //             ? "View Order"
        //             : "Create New Order"}
        //         </ModalHeader>

        //         <ModalBody className="max-h-[600px] overflow-y-auto">
        //           <div className="grid grid-cols-2 gap-4">
        //             {/* General Info */}
        //             <div className="flex items-center space-x-2 mb-4">
        //               <div className="font-semibold w-1/3">User ID</div>
        //               <Input
        //                 value={order.userId}
        //                 disabled={true}
        //                 name="userId"
        //               />
        //             </div>
        //             <div className="flex items-center space-x-2 mb-4">
        //               <div className="font-semibold w-1/3">Status</div>
        //               <Select
        //                 value={order.status}
        //                 selectedKeys={[order.status]}
        //                 isDisabled={mode === "view"}
        //                 onChange={handleChangeOrder}
        //                 name="status"
        //               >
        //                 {[
        //                   "Pending",
        //                   "Processing",
        //                   "Shipped",
        //                   "Delivered",
        //                   "Cancelled",
        //                 ].map((status) => (
        //                   <SelectItem key={status} value={status}>
        //                     {status}
        //                   </SelectItem>
        //                 ))}
        //               </Select>
        //             </div>
        //           </div>
        //           {/* Payment */}
        //           <div>
        //             <h4 className="font-bold mb-4">Payment</h4>
        //             <div>
        //               <div className="flex items-center space-x-2 mb-2">
        //                 <div className="font-semibold w-1/3">
        //                   Payment Method
        //                 </div>
        //                 <Input
        //                   value={order.paymentMethod}
        //                   disabled={true}
        //                   name="paymentMethod"
        //                   onChange={handleChangeOrder}
        //                 />
        //               </div>

        //               <div className="flex items-center space-x-2 mb-2">
        //                 <div className="font-semibold w-1/3">
        //                   Payment Status
        //                 </div>
        //                 <Select
        //                   value={order.paymentStatus}
        //                   selectedKeys={[order.paymentStatus]}
        //                   isDisabled={mode === "view"}
        //                   onChange={handleChangeOrder}
        //                   name="paymentStatus"
        //                 >
        //                   {["Pending", "Paid"].map((status) => (
        //                     <SelectItem key={status} value={status}>
        //                       {status}
        //                     </SelectItem>
        //                   ))}
        //                 </Select>
        //               </div>

        //               <div className="flex items-center space-x-2 mb-2">
        //                 <div className="font-semibold w-1/3">Total Amount</div>
        //                 <Input
        //                   value={order.totalAmount}
        //                   type="number"
        //                   disabled={true}
        //                   name="totalAmount"
        //                 />
        //               </div>
        //             </div>
        //           </div>
        //           {/* Shipping Address */}
        //           <div className="mt-4">
        //             <h4 className="font-bold mb-4">Shipping Address</h4>
        //             <div className="grid grid-cols-2 gap-4">
        //               <Input
        //                 label="Street"
        //                 value={order.shippingAddress?.street}
        //                 disabled={mode === "view"}
        //                 name="shippingAddress.street"
        //                 onChange={handleChangeOrder}
        //               />
        //               <Input
        //                 label="City"
        //                 value={order.shippingAddress?.city}
        //                 disabled={mode === "view"}
        //                 name="shippingAddress.city"
        //                 onChange={handleChangeOrder}
        //               />
        //               <Input
        //                 label="State"
        //                 value={order.shippingAddress?.state}
        //                 disabled={mode === "view"}
        //                 name="shippingAddress.state"
        //                 onChange={handleChangeOrder}
        //               />
        //               <Input
        //                 label="Zip Code"
        //                 value={order.shippingAddress?.zipCode}
        //                 disabled={mode === "view"}
        //                 name="shippingAddress.zipCode"
        //                 onChange={handleChangeOrder}
        //               />
        //             </div>
        //           </div>

        //           {/* Products */}
        //           <div className="mt-4">
        //             <h4 className="font-bold mb-4">Products</h4>
        //             <Table>
        //               <TableHeader>
        //                 <TableColumn>Product ID</TableColumn>
        //                 <TableColumn>Quantity</TableColumn>
        //                 <TableColumn>Unit Price</TableColumn>
        //               </TableHeader>
        //               <TableBody>
        //                 {order.items?.map((item, index) => (
        //                   <TableRow key={index}>
        //                     <TableCell>{item.productId}</TableCell>
        //                     <TableCell>{item.quantity}</TableCell>
        //                     <TableCell>${item.price}</TableCell>
        //                   </TableRow>
        //                 ))}
        //               </TableBody>
        //             </Table>
        //           </div>
        //         </ModalBody>

        //         <ModalFooter>
        //           <Button color="danger" variant="light" onPress={onClose}>
        //             Close
        //           </Button>
        //         </ModalFooter>
        //       </>
        //     )}
        //   </ModalContent>
        // </Modal>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Order Details
                  <p className="text-small text-default-500">
                    Order ID: {order._id}
                  </p>
                </ModalHeader>
                <ModalBody>
                  {/* Thông tin người dùng và đơn hàng */}
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
                    <h3 className="text-xl font-bold">
                      Total Amount: {formatCurrency(order.totalAmount)}
                    </h3>
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

      {order && mode === "delete" && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Delete Order
                </ModalHeader>
                <ModalBody className="max-h-[500px] overflow-y-auto">
                  <div className="flex flex-col space-y-4">
                    Do you want delete this order?
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={loading && mode === "delete"}
                    color="danger"
                    onPress={() => {}}
                  >
                    Delete
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
