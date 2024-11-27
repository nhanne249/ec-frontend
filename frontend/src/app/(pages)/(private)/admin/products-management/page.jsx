'use client';
import React, { useState, useEffect } from 'react';
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
} from '@nextui-org/react';
import { getAllProducts } from '@/app/api/products';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
  });

  const handleViewProduct = id => {
    alert('view product: ' + id);
    return;
  };

  const handleEditProduct = id => {
    alert('edit product: ' + id);
    return;
  };

  const handleDeleteProduct = id => {
    alert('delete product: ' + id);
    return;
  };

  const handleAddProduct = () => {
    alert('add product');
    return;
  };

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-400"
            style={{
              clipPath: 'inset(0 50% 0 0)',
              stroke: 'currentColor',
              strokeWidth: '1',
            }}
          />,
        );
      } else {
        stars.push(
          <FaStar
            key={i}
            className="text-transparent border border-yellow-400"
            style={{ stroke: 'currentColor', strokeWidth: '1' }}
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
        setProducts(res);
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
      setFilters(prev => ({ ...prev, [name]: value }));
    }
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
      {loading || products.length > 0 ? (
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
                      <div className="flex flex-row items-center space-x-2">
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
                          onClick={() => handleViewProduct(product._id)}
                          size="sm"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleEditProduct(product._id)}
                          size="sm"
                          color="success"
                          className="text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(product._id)}
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
    </div>
  );
};

export default ProductsManagement;
