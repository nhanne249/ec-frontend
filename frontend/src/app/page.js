import { Image } from  '@nextui-org/image'
import {Card, CardHeader, CardBody} from "@nextui-org/card";
import { getAllProducts } from "@/app/api/server/products";
import NavigateBtn from "./utils/components/NavigateBtn";

export default async function Home() {
  const featuredProducts = await getAllProducts().then((res)=>{return res.results})
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-200 to-blue-400 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Discover Your Glow</h2>
          <p className="text-xl mb-6">Premium Skincare & Cosmetics</p>
          
          <NavigateBtn link= "/shop" content='Shop Now'/>
        </div>
      </div>

      {/* Featured Products Section*/}
      <div className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center mb-8 text-blue-600">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card 
              key={product._id} 
              className="hover:shadow-lg transition-all duration-300"
              isPressable
            >
              <CardHeader className="flex-col items-start">
                <h4 className="font-bold text-lg">{product.name}</h4>
                <small className="text-default-500">{product.description}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2 justify-between">
                <Image
                  alt={product.name}
                  className="object-cover rounded-xl w-full aspect-square"
                  src={product.images[0]}
                />
                  <p className="font-semibold text-lg text-blue-600">{String(product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div> 
    </div>
  );
}