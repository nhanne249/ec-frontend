import axios from "axios";
import React from "react";
import { getProductById } from "@/app/api/products";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
} from "@nextui-org/react";

const RELATED_PRODUCTS = 4;

const StarRating = ({ rate, count }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Render 5 stars */}
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            const starValue = index + 1; // Star position (1 to 5)

            return (
              <div key={index} className="relative">
                {/* Empty star as the base */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gray"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M12 .587l3.668 7.429L24 9.748l-6 5.847L19.335 24 12 20.188 4.665 24 6 15.595 0 9.748l8.332-1.732z" />
                </svg>

                {/* Overlay full or half star */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gold"
                  viewBox="0 0 24 24"
                  className="absolute top-0 left-0 w-6 h-6"
                  style={{
                    clipPath:
                      rate >= starValue
                        ? "none" // Full star
                        : rate > starValue - 1
                        ? "inset(0 50% 0 0)" // Half star
                        : "inset(0 100% 0 0)", // No fill
                  }}
                >
                  <path d="M12 .587l3.668 7.429L24 9.748l-6 5.847L19.335 24 12 20.188 4.665 24 6 15.595 0 9.748l8.332-1.732z" />
                </svg>
              </div>
            );
          })}
      </div>

      {/* Reviews count */}
      <span className="text-gray-500 text-sm">
        | {count} Customer Review(s)
      </span>
    </div>
  );
};

const ShareIcons = () => (
  <div className="flex space-x-2">
    <a href="#" aria-label="Facebook">
      <i className="fab fa-facebook"></i>
    </a>
    <a href="#" aria-label="LinkedIn">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="#" aria-label="Twitter">
      <i className="fab fa-twitter"></i>
    </a>
  </div>
);

const ProductCard = ({
  productName = "Product Name",
  shortDescription = "Description",
  price = "Price",
  image,
}) => {
  return (
    <Card className="rounded-none max-w-xs">
      <Image width="288" height={301} alt="Product Image" src={image} />
      <CardFooter className="flex flex-col items-start">
        <div className="text-[1.5rem] font-semibold truncate w-full">
          {productName}
        </div>
        <div className="text-[#898989] font-medium">{shortDescription}</div>
        <div className="text-[1.25rem] font-semibold">
          ${typeof price === "number" ? price.toFixed(2) : price}
        </div>
      </CardFooter>
    </Card>
  );
};

const ProductPage = async ({ params }) => {
  const { id } = await params;

  // Change this fake API call later
  const products = await axios
    .get(`https://fakestoreapi.com/products`)
    .then((response) => response.data);

  const product = products.filter((item) => item.id == id)[0];
  console.log(product);
  const shuffled = products.sort(() => Math.random() - 0.5);
  const randomItems = shuffled.slice(0, RELATED_PRODUCTS);

  return (
    <div className="container mx-auto mt-6">
      <div className="flex gap-10 justify-center pb-10">
        <div className="flex justify-between">
          <Image width={300} alt="Product image" src={product.image} />
        </div>
        <div className="flex flex-col max-w-lg gap-4">
          <div>
            <div className="font-semibold text-[2.625rem]">{product.title}</div>
            <div className="font-medium text-[1.5rem] text-[#9F9F9F]">
              ${product.price}
            </div>
          </div>
          <div>{StarRating(product.rating)}</div>
          <div>{product.description}</div>
          <div className="text-[0.875rem] text-[#9F9F9F]">Size</div>
          <div className="flex gap-2">
            {/* TODO: Change those choices with data from API */}
            {["L", "XL", "XS"].map((size) => (
              <Button
                key={size}
                size="sm"
                bordered
                color="warning"
                className="rounded-md min-w-[48px]"
              >
                {size}
              </Button>
            ))}
          </div>
          <div className="text-[0.875rem] text-[#9F9F9F]">Color</div>
          <div className="flex gap-2">
            {/* TODO: Change those choices with data from API */}
            {["#8A2BE2", "#000000", "#D4AF37"].map((color) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex gap-4">
            {/* TODO: Handle quantity */}
            <div className="flex items-center border border-black rounded-lg">
              <Button className="rounded-l-lg rounded-r-none">-</Button>
              <Input type="number" className="w-16 text-center" />
              <Button className="rounded-r-lg rounded-l-none w-fit">+</Button>
            </div>

            {/* TODO: Handle button click events */}
            <Button variant="bordered">Add To Cart</Button>
            <Button variant="bordered">+ Compare</Button>
          </div>
          <Divider className="my-5" />
          <div className="flex flex-col space-y-2 text-gray-500">
            {/* TODO: Change this with data from API */}
            {[
              { label: "SKU", value: "SS001" },
              { label: "Category", value: "Sofas" },
              { label: "Tags", value: "Sofa, Chair, Home, Shop" },
              { label: "Share", value: <ShareIcons /> },
            ].map((item, index) => (
              <div key={index} className="flex">
                <div className="w-20">{item.label}</div>
                <div className="mx-2">:</div>
                <div className="flex-1">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Divider className="absolute left-0 w-screen" />
      <div className="flex flex-col items-center py-10">
        <div className="flex justify-around text-[1.5rem] font-medium gap-10 mb-10">
          <div>Description</div>
          <div>Additional Information</div>
          <div>Reviews</div>
        </div>
        <div className="max-w-screen-xl mb-10">{product.description}</div>
        <div className="max-w-screen-2xl flex w-full justify-around">
          <Image width={350} height={350} src={products[products.length - 1].image} />
          <Image width={350} height={350} src={products[products.length - 2].image} />
          <Image width={350} height={350} src={products[products.length - 3].image} />
        </div>
      </div>
      <Divider className="absolute left-0 w-screen" />
      <div className="flex flex-col items-center gap-6 py-10">
        <div className="font-medium text-[2.25rem]">Related Products</div>
        <div className="flex justify-around gap-6">
          {randomItems.map((product) =>
            ProductCard({
              image: product.image,
              price: product.price,
              productName: product.title,
            })
          )}
        </div>
        <Button variant="bordered" color="warning">
          Show more
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
