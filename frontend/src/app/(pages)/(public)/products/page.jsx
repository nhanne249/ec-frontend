'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getAllProducts } from '@/app/api/products';
import { Card, Skeleton, CardHeader, CardBody } from '@nextui-org/react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await getAllProducts();
      setProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="px-20 pt-10 pb-20 lg:px-30 2xl:px-40">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="p-4" radius="lg">
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
          : products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Products;
