import React from "react";
import { getProductById } from "@/app/api/server/products";
import { Button, Divider, Image } from "@nextui-org/react";
import AddToCartBtn from "@/app/utils/components/AddToCartBtn";

const StarRating = ({ rate }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            const starValue = index + 1;

            return (
              <div key={index} className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                  <path d="M12 .587l3.668 7.429L24 9.748l-6 5.847L19.335 24 12 20.188 4.665 24 6 15.595 0 9.748l8.332-1.732z" />
                </svg>
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
    </div>
  );
};

const ProductPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id).then((response) => {
    return response.product;
  });

  return (
    <div className="container mx-auto mt-6">
      <div className="grid grid-cols-6 grid-rows-1 gap-4 pb-10">
        <div className="col-span-2 col-start-2 w-full h-full flex justify-center">
          <Image className="w-full" alt="Product image" src={product.images[0]} />
        </div>
        <div className="col-span-2 col-start-4 flex flex-col gap-4">
          <div className="font-semibold text-[2.625rem]">{product.name}</div>
          <div className="font-medium text-[1.5rem] text-[#9F9F9F]">${product.price}</div>
          <StarRating rate={product.rating} />
          <div>{product.desc}</div>

          {/* TODO: Handle button click events */}
          <AddToCartBtn id={id} />
          <Divider className="my-5" />
          <div className="flex flex-col space-y-2 text-gray-500">
            {/* TODO: Change this with data from API */}
            {[
              { label: "Category", value: `${product.category}` },
              { label: "Brand", value: `${product.brand}` },
              { label: "Capacity", value: `${product.capacity}` },
              { label: "Benefit", value: `${product.benefit}` },
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
      </div>
      <Divider className="absolute left-0 w-screen" />
      <div className="flex flex-col items-center gap-6 py-10">
        <div className="font-medium text-[2.25rem]">Related Products</div>
        <div className="flex justify-around gap-6"></div>
        <Button variant="bordered" color="warning">
          Show more
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
