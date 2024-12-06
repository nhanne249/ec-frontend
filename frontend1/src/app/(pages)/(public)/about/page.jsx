import React from "react";
import { Card, CardBody, Button, Image } from "@nextui-org/react";
import { Leaf, Star, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-200 to-blue-400 flex items-center justify-center">
        <div className="text-center text-white container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Beauty Philosophy</h1>
          <p className="text-xl max-w-2xl mx-auto">
            At Beauty Essentials, we believe in empowering individuals through thoughtful, sustainable, and scientifically-backed skincare solutions.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-full">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Story</h2>
            <p className="text-gray-700 mb-4">
              8GROUP was founded with a passion for clean beauty. Tired of harmful chemicals and artificial additives in conventional products, we set out to
              create a line of beauty solutions that are both effective and gentle on the skin. Each product is thoughtfully crafted, using sustainably sourced
              ingredients that nourish your skin and respect the environment.
            </p>
            <p className="text-gray-700 mb-4">
              From small beginnings, we've grown into a trusted brand for those seeking safe, natural, and eco-friendly beauty alternatives.
            </p>
          </div>

          <div className="h-full">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              <b>Natural Ingredients</b>
              <br />
              Our products are made with love and care, free from parabens, sulfates, and synthetic fragrances. We use plant-based extracts, essential oils, and
              other earth-derived ingredients that bring out your skin's natural glow.
            </p>
            <p className="text-gray-700 mb-4">
              <b>Sustainability</b>
              <br />
              Caring for your skin shouldn't harm the planet. That's why we prioritize eco-friendly packaging, ethical sourcing, and cruelty-free practices.
            </p>
            <p className="text-gray-700 mb-4">
              <b>For Everyone</b>
              <br />
              We believe beauty should be inclusive. Whether you have sensitive, oily, or combination skin, we've got products tailored to your needs.
            </p>
          </div>

          <div className="h-full">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Why Choose Us?</h2>
            <p className="text-gray-700 mb-4">
              <b>Proven Results</b>
              <br />
              Trusted by thousands, our products deliver visible improvements for healthier, radiant skin.
            </p>
            <p className="text-gray-700 mb-4">
              <b>Safe and Gentle</b>
              <br />
              Perfect for all skin types, including sensitive skin.
            </p>
            <p className="text-gray-700 mb-4">
              <b>Ethical Practices</b>
              <br />
              We stand by cruelty-free, environmentally responsible values.
            </p>
          </div>

          <div className="h-full">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Join Our Journey</h2>
            <p className="text-gray-700 mb-4">
              8GROUP isn't just a brand—it's a community of individuals who care about what they put on their skin and the impact it has on the world. We invite
              you to explore our collection, discover the benefits of natural beauty, and become part of a movement that celebrates self-care and
              sustainability.
            </p>
            <p className="text-gray-700 mb-4">
              <b>Connect with Us!</b>
              <br />
              Have questions or feedback? We'd love to hear from you. Reach out to us at Email. Let's embrace beauty the way nature intended—pure, simple, and
              effective.
            </p>
          </div>
          <Image src="/api/placeholder/500/500" alt="Beauty Essentials Founder" className="rounded-2xl shadow-lg" />
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-blue-600">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-16 h-16 mx-auto text-green-500 mb-4" />,
                title: "Sustainability",
                description: "We're committed to reducing environmental impact through recyclable packaging and responsibly sourced ingredients.",
              },
              {
                icon: <Star className="w-16 h-16 mx-auto text-yellow-500 mb-4" />,
                title: "Innovation",
                description: "Continuous research drives our product development, ensuring cutting-edge formulations that deliver real results.",
              },
              {
                icon: <Heart className="w-16 h-16 mx-auto text-red-500 mb-4" />,
                title: "Inclusivity",
                description: "Beauty is universal. Our products are designed to work beautifully across all skin types and tones.",
              },
            ].map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardBody className="text-center">
                  {value.icon}
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
