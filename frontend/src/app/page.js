"use client"

import React from 'react';
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Image 
} from "@nextui-org/react";
import { HeartIcon } from "lucide-react";
import { redirect } from 'next/navigation';

// Sample product data - you would typically fetch this from a backend
const featuredProducts = [
  {
    id: 1,
    name: "Hydrating Face Cream",
    description: "Intense moisture for radiant skin",
    price: 29.99,
    image: "/api/placeholder/300/400"
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    description: "Brighten and protect your complexion",
    price: 45.50,
    image: "/api/placeholder/300/400"
  },
  {
    id: 3,
    name: "Natural Lip Balm Set",
    description: "Nourish your lips with organic ingredients",
    price: 15.99,
    image: "/api/placeholder/300/400"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-200 to-blue-400 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Discover Your Glow</h2>
          <p className="text-xl mb-6">Premium Skincare & Cosmetics</p>
          <Button 
            color="default" 
            variant="solid" 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-100"
            onClick={() => {
              redirect("/shop");
            }}
          >
            Shop Now
          </Button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center mb-8 text-blue-600">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="hover:shadow-lg transition-all duration-300"
              isPressable
            >
              <CardHeader className="flex-col items-start">
                <h4 className="font-bold text-lg">{product.name}</h4>
                <small className="text-default-500">{product.description}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt={product.name}
                  className="object-cover rounded-xl"
                  src={product.image}
                  width={270}
                />
                <div className="flex justify-between items-center mt-4">
                  <p className="font-semibold text-lg text-blue-600">${product.price}</p>
                  <Button 
                    isIconOnly 
                    color="danger" 
                    variant="light" 
                    aria-label="Like"
                  >
                    <HeartIcon />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-blue-600">Stay Glowing</h3>
          <p className="mb-6 text-gray-600">Subscribe to our newsletter for exclusive offers</p>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 border border-blue-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button 
                  color="primary" 
                  className="rounded-r-lg"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
