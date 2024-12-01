'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Input,
  Button,
  Select,
  SelectItem,
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
} from '@nextui-org/react';
import {
  getAllProducts,
  updateProductById,
  deleteProductById,
  createProduct,
} from '@/app/api/client/products';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import withAuth from '@/app/configs/route';
import { useDisclosure } from '@nextui-org/react';

const ProductsManagement = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
  });
  const [mode, setMode] = useState('');

  const handleViewProduct = product => {
    setProduct(product);
    setMode('view');
    onOpen();
  };

  const handleEditProduct = product => {
    setProduct(product);
    setMode('edit');
    onOpen();
  };

  const handleDeleteProduct = product => {
    setProduct(product);
    setMode('delete');
    onOpen();
  };

  const handleAddProduct = () => {
    setProduct({
      name: '',
      capacity: '0ml',
      price: 0,
      originalPrice: 0,
      desc: '',
      category: '',
      brand: '',
      stock: 0,
      benefit: 0,
      rating: 0,
      image: [''],
    });
    setMode('add');
    onOpen();
  };

  const editProduct = async onClose => {
    const { _id, createdAt, updatedAt, isDel, ...data } = product;
    setLoading(true);
    await updateProductById(_id, data)
      .then(res => {
        const updatedProducts = products.map(p => (p._id == res._id ? res : p));
        setProducts(updatedProducts);
        toast.success('Edit product successfully', {
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

  const addProduct = async onClose => {
    const data = product;
    setLoading(true);
    await createProduct(data)
      .then(res => {
        const updatedProducts = { ...products, res };
        setProducts(updatedProducts);
        toast.success('Add product successfully', {
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

  const deleteProduct = async onClose => {
    setLoading(true);
    await deleteProductById(product._id)
      .then(res => {
        const updatedProducts = products.filter(p => p._id !== res._id);
        setProducts(updatedProducts);
        toast.success('Delete product successfully', {
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

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating); // Số sao đầy
    const hasHalfStar = rating % 1 !== 0; // Kiểm tra có sao rưỡi hay không

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Sao đầy
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Sao rưỡi
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-400"
            style={{
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
            }}
          />,
        );
      } else {
        // Sao rỗng (viền vàng)
        stars.push(
          <FaStar
            key={i}
            className="text-gray-300"
            style={{
              stroke: 'currentColor',
              strokeWidth: 1,
            }}
          />,
        );
      }
    }

    return stars;
  };

  const fetchProducts = async filterData => {
    setLoading(true);
    await getAllProducts(filterData)
      .then(res => {
        setProducts(res.results);
      })
      .catch(error => {
        setProducts([]);
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

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'minPrice') {
      if (
        Number(value) < 0 ||
        (filters.maxPrice && Number(value) > Number(filters.maxPrice))
      ) {
        return;
      }
      setFilters(prev => ({ ...prev, minPrice: Number(value) }));
    } else if (name === 'maxPrice') {
      if (
        Number(value) < 0 ||
        (filters.minPrice && Number(value) < Number(filters.minPrice))
      ) {
        return;
      }
      setFilters(prev => ({ ...prev, maxPrice: Number(value) }));
    } else {
    }
  };

  const handleChangeProduct = e => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => fetchProducts(filters);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="px-20 lg:px-30 2xl:px-40 pb-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        Products Management
      </h1>

      {/* Filters Section */}
      <div className="bg-[#F9F1E7] p-6 rounded-lg shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <Select
            label="Category"
            placeholder="Select category"
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <SelectItem key="">All</SelectItem>
            <SelectItem key="Haircare">Haircare</SelectItem>
            <SelectItem key="Shampoo">Shampoo</SelectItem>
          </Select>
          <Input
            label="Name"
            placeholder="Enter product name"
            name="name"
            value={filters.name}
            onChange={handleChange}
          />
          <Input
            label="Min Price"
            type="number"
            min={0}
            max={filters.maxPrice}
            placeholder="Enter min price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
          />
          <Input
            label="Max Price"
            type="number"
            min={filters.minPrice}
            placeholder="Enter max price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
          />
          <Select
            label="Rating"
            placeholder="Select rating"
            name="rating"
            value={filters.rating}
            onChange={handleChange}
          >
            <SelectItem key="">All</SelectItem>
            {[1, 2, 3, 4, 5].map(stars => (
              <SelectItem key={stars} value={stars}>
                {`${stars} Stars`}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex justify-end mt-4">
          <Button color="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Products Table */}
      {(loading && mode === '') || products.length > 0 ? (
        <Table
          aria-label="Product Table"
          css={{ height: 'auto', minWidth: '100%' }}
        >
          <TableHeader>
            <TableColumn className="text-center">Name</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Brand</TableColumn>
            <TableColumn>Capacity</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Rating</TableColumn>
            <TableColumn>Stock</TableColumn>
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
              : products.length > 0 &&
                products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="grid grid-cols-2 items-center">
                        <Image
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0]
                              : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
                          }
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-xl"
                        />{' '}
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.capacity}</TableCell>
                    <TableCell className="text-green-500 font-medium">{`$${product.price.toFixed(
                      2,
                    )}`}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex flex-row space-x-2 justify-center">
                        <Button
                          onClick={() => handleViewProduct(product)}
                          size="sm"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleEditProduct(product)}
                          size="sm"
                          color="success"
                          className="text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(product)}
                          size="sm"
                          color="danger"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      ) : (
        <div>No products found</div>
      )}
      <div className="flex justify-end mt-4">
        <Button onClick={handleAddProduct} color="primary">
          Add new product
        </Button>
      </div>

      {product && mode !== 'delete' && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  {mode == 'edit'
                    ? 'Update Product'
                    : mode == 'view'
                    ? 'View Product'
                    : 'Add Product'}
                </ModalHeader>
                <ModalBody className="max-h-[500px] overflow-y-auto">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Product name:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        name="name"
                        value={product.name}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Capacity:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        name="capacity"
                        value={product.capacity}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Price:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        type="number"
                        name="price"
                        value={product.price}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Original price:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        type="number"
                        name="originalPrice"
                        value={product.originalPrice}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Description:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        name="desc"
                        value={product.desc}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Category:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        name="category"
                        value={product.category}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Brand:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        name="brand"
                        value={product.brand}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Stock:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        type="number"
                        name="stock"
                        value={product.stock}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Benefit:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={mode === 'view'}
                        name="benefit"
                        value={product.benefit}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Rating:</div>
                      <Input
                        onChange={handleChangeProduct}
                        disabled={true}
                        type="number"
                        max="5"
                        min="1"
                        name="rating"
                        value={product.rating}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-2 justify-between">
                      <div className="font-semibold w-1/3">Image:</div>
                      <Image
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
                        }
                        alt={product.name}
                        className="object-cover rounded-xl"
                      />
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
                        onPress={() => addProduct(onClose)}
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

      {product && mode === 'delete' && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Delete Product
                </ModalHeader>
                <ModalBody className="max-h-[500px] overflow-y-auto">
                  <div className="flex flex-col space-y-4">
                    Do you want delete this product ?
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={loading && mode === 'delete'}
                    color="danger"
                    onPress={() => deleteProduct(onClose)}
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

export default withAuth(ProductsManagement, ['admin']);
