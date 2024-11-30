"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/app/api/client/products";
import { Card, Skeleton, CardHeader, CardBody, Input, Button, Select, SelectItem } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
    rating: "",
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    return stars;
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;

    if (name === "minPrice") {
      if (Number(value) < 0 || (filters.maxPrice && Number(value) > Number(filters.maxPrice))) {
        return;
      }
      setFilters((prev) => ({ ...prev, minPrice: Number(value) }));
    } else if (name === "maxPrice") {
      if (Number(value) < 0 || (filters.minPrice && Number(value) < Number(filters.minPrice))) {
        return;
      }
      setFilters((prev) => ({ ...prev, maxPrice: Number(value) }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Initial fetch
  useEffect(() => {
    getAllProducts(filters).then((res) => {
      setProducts(res);
      setLoading(true);
    });
  }, [loading]);

  return (
    <div className="px-20 lg:px-30 2xl:px-40 pb-20 h-full w-full">
      <h1 className="text-3xl font-bold text-center mb-10">Products</h1>

      {/* Filters Section */}
      <div className="bg-[#F9F1E7] p-6 rounded-lg shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <Select label="Category" placeholder="Select category" name="category" value={filters.category} onChange={handleChange}>
            <SelectItem key="">All</SelectItem>
            <SelectItem key="Haircare">Haircare</SelectItem>
            <SelectItem key="Shampoo">Shampoo</SelectItem>
          </Select>
          <Input label="Name" placeholder="Enter product name" name="name" value={filters.name} onChange={handleChange} />
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
          <Select label="Rating" placeholder="Select rating" name="rating" value={filters.rating} onChange={handleChange}>
            <SelectItem key="">All</SelectItem>
            {[1, 2, 3, 4, 5].map((stars) => (
              <SelectItem key={stars}>{String(stars)}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex justify-end mt-4">
          <Button color="primary" onClick={() => setLoading(false)}>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
        {!loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="p-4 h-full" radius="lg">
              <CardHeader>
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
              </CardHeader>
              <CardBody className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </CardBody>
            </Card>
          ))
        ) : products.length > 0 ? (
          products.map((product, index) => <ProductCard key={index} product={product} />)
        ) : (
          <div className="col-span-full text-center text-lg font-medium">No products found.</div>
        )}
      </div>
    </div>
  );
};
export default Shop;
