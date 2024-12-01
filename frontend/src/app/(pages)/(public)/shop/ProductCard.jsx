import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react';
import { FaStar } from 'react-icons/fa'; // Import star icon for rating

const ProductCard = ({ product }) => {
  const router = useRouter();
  // Helper function to render stars based on rating
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

  const viewProductDetail = () => {
    router.push(`/product/${product._id}`); // Điều hướng đến trang chi tiết
  };

  const addToCart = () => {
    alert(product._id);
  };

  return (
    <div className="cursor-pointer h-full" onClick={viewProductDetail}>
      <Card className="shadow h-full hover:shadow-lg transition-all relative rounded bg-gray-100">
        <CardHeader className="!p-0">
          <Image
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
            }
            alt={product.name}
            className="w-full object-cover rounded-none"
          />
        </CardHeader>
        <CardBody>
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-green-500 font-bold">${product.price}</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">{product.capacity}</p>

          <div className="flex items-center mt-2 space-x-2">
            <span className="flex">{renderStars(product.rating)}</span>
            <span className="text-gray-500 text-sm">({product.rating})</span>
          </div>
        </CardBody>
        <CardFooter>
          <Button className="w-full" color="primary" onClick={addToCart}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
