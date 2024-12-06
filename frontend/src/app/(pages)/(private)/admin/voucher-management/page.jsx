'use client';
import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Image,
  Skeleton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Chip,
} from '@nextui-org/react';
import { createProduct } from '@/app/api/client/products';
import { toast } from 'react-toastify';
import withAuth from '@/app/configs/route';
import { useDisclosure } from '@nextui-org/react';
import { createVoucher, getVoucher } from '@/app/api/client/voucher';
import moment from 'moment';

const VoucherManagement = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [voucher, setVoucher] = useState({});
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState('');

  const handleViewVoucher = voucher => {
    setVoucher(voucher);
    setMode('view');
    onOpen();
  };

  const handleAddVoucher = () => {
    setVoucher({
      code: '',
      maxUsage: 0,
      currentUsage: 0,
      discount: 0,
      maxDiscountPrice: 0,
      isActive: true,
      expiresAt: '',
    });
    setMode('add');
    onOpen();
  };

  const addVoucher = async onClose => {
    if (
      !voucher.code ||
      voucher.code === '' ||
      !voucher.expiresAt ||
      voucher.expiresAt === ''
    ) {
      toast.error('Code and Expires At are required fields.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return; // Dừng hàm nếu có trường không hợp lệ
    }
    const data = [voucher];
    setLoading(true);
    await createVoucher(data)
      .then(res => {
        const updatedVouchers = [voucher, ...vouchers];
        setVouchers(updatedVouchers);
        toast.success('Add voucher successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch(error => {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
    setLoading(false);
    onClose();
  };

  const fetchVouchers = async () => {
    setLoading(true);
    await getVoucher()
      .then(res => {
        setVouchers(res);
      })
      .catch(error => {
        setVouchers([]);
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
    setLoading(false);
  };

  const handleVoucherChange = e => {
    const { name, value } = e.target;
    if (name === 'expiresAt') {
      const date = moment(value); // Chuyển đổi giá trị thành đối tượng moment
      setVoucher(prev => ({
        ...prev,
        [name]: date.endOf('day').toISOString(),
      })); // Đặt giá trị ở định dạng ISO
    } else {
      setVoucher(prev => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  return (
    <div className="px-20 lg:px-30 2xl:px-40 pb-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        Voucher Management
      </h1>

      {/* Products Table */}
      {(loading && mode === '') || vouchers.length > 0 ? (
        <Table
          aria-label="Product Table"
          css={{ height: 'auto', minWidth: '100%' }}
        >
          <TableHeader>
            <TableColumn className="text-center">Code</TableColumn>
            <TableColumn>Max Usage</TableColumn>
            <TableColumn>Discount</TableColumn>
            <TableColumn>Max Discount Price</TableColumn>
            <TableColumn>Current Usage</TableColumn>
            <TableColumn>State</TableColumn>
            <TableColumn>Expired At</TableColumn>
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
              : vouchers.length > 0 &&
                vouchers.map((voucher, index) => (
                  <TableRow key={index}>
                    <TableCell>{voucher.code}</TableCell>
                    <TableCell>{voucher.maxUsage}</TableCell>
                    <TableCell>{voucher.discount}</TableCell>
                    <TableCell>{voucher.maxDiscountPrice}</TableCell>
                    <TableCell>{voucher.currentUsage}</TableCell>
                    <TableCell>
                      {voucher.isActive ? (
                        <Chip color="success">Active</Chip>
                      ) : (
                        <Chip color="error">Inactive</Chip>
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(voucher.expiresAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row space-x-2 justify-center">
                        <Button
                          onClick={() => handleViewVoucher(voucher)}
                          size="sm"
                        >
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      ) : (
        <div>No vouchers found</div>
      )}
      <div className="flex justify-end mt-4">
        <Button onClick={handleAddVoucher} color="primary">
          Add new voucher
        </Button>
      </div>

      {voucher && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  {mode == 'edit'
                    ? 'Update Voucher'
                    : mode == 'view'
                    ? 'View Voucher'
                    : 'Add Voucher'}
                </ModalHeader>
                <ModalBody className="max-h-[500px] overflow-y-auto">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Code:</div>
                      {mode === 'view' ? (
                        <div>{voucher.code}</div>
                      ) : (
                        <Input
                          onChange={handleVoucherChange}
                          name="code"
                          value={voucher.code}
                          required
                        />
                      )}
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Max Usage:</div>
                      {mode === 'view' ? (
                        <div>{voucher.maxUsage}</div>
                      ) : (
                        <Input
                          onChange={handleVoucherChange}
                          type="number"
                          min="0"
                          name="maxUsage"
                          value={voucher.maxUsage}
                        />
                      )}
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Discount:</div>
                      {mode === 'view' ? (
                        <div>{voucher.discount}</div>
                      ) : (
                        <Input
                          onChange={handleVoucherChange}
                          type="number"
                          min="0"
                          name="discount"
                          value={voucher.discount}
                        />
                      )}
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">
                        Max discount price:
                      </div>
                      {mode === 'view' ? (
                        <div>{voucher.maxDiscountPrice}</div>
                      ) : (
                        <Input
                          onChange={handleVoucherChange}
                          type="number"
                          min="0"
                          name="maxDiscountPrice"
                          value={voucher.maxDiscountPrice}
                        />
                      )}
                    </div>
                    {mode === 'view' && (
                      <>
                        <div className="flex flex-row items-center space-x-2 justify-between">
                          <div className="font-semibold w-1/3">State:</div>

                          {voucher.isActive ? (
                            <Chip color="success">Active</Chip>
                          ) : (
                            <Chip color="error">Inactive</Chip>
                          )}
                        </div>
                        <div className="flex flex-row items-center space-x-2 justify-between">
                          <div className="font-semibold w-1/3">
                            Current usage:
                          </div>
                          <div>{voucher.currentUsage}</div>
                        </div>
                      </>
                    )}

                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Expires at:</div>
                      {mode === 'view' ? (
                        <div>
                          {moment(voucher.expiresAt).format('DD/MM/YYYY')}
                        </div>
                      ) : (
                        <Input
                          onChange={handleVoucherChange}
                          name="expiresAt"
                          type="date" // Thay đổi kiểu input thành date
                          value={moment(voucher.expiresAt).format('YYYY-MM-DD')}
                        />
                      )}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {mode === 'edit' ? (
                    <Button
                      isLoading={loading && mode === 'edit'}
                      color="primary"
                      onPress={() => editProduct(onClose)}
                    >
                      Update
                    </Button>
                  ) : (
                    mode === 'add' && (
                      <Button
                        isLoading={loading && mode === 'add'}
                        color="primary"
                        onPress={() => addVoucher(onClose)}
                      >
                        Add
                      </Button>
                    )
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default withAuth(VoucherManagement, ['admin']);
