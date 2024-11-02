'use client'
import { useState,useEffect } from "react";
import { getAllProducts } from "@/app/api/products";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

export default function Home() {
  // const [productsList, setProductsList] = useState();
  // const [isReceived, setIsReceived] = useState(false);
  // useEffect(() => {
  //   getAllProducts().then((res) => {
  //     setProductsList(res);
  //     setIsReceived(true);
  //   })
  // }, [isReceived])
  return (
    // isReceived &&
    <div className="grid grid-cols-4">
      Home
      {/* {productsList.map((product) => {
        return(
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-fit"
            key={product._id}
          >
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={product.images[0]}
              width={200}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-black">{product.name}</p>
              <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                Buy
              </Button>
            </CardFooter>
          </Card>
        )
    })} */}
    </div>
  );
}
