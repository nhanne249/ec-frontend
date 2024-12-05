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
            At Beauty Essentials, we believe in empowering individuals through
            thoughtful, sustainable, and scientifically-backed skincare
            solutions.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-blue-600">
              Our Journey
            </h2>
            <p className="text-gray-700 mb-4">
              Founded in 2022 by a team of passionate skincare researchers,
              Beauty Essentials emerged from a simple yet powerful vision: to
              create cosmetics that are kind to your skin and the planet.
            </p>
            <p className="text-gray-700 mb-4">
              Our founder, Sarah Thompson, a biochemist with over 15 years of
              experience in dermatological research, was frustrated by the lack
              of truly transparent and environmentally responsible skincare
              options.
            </p>
            <Button color="primary" variant="solid" className="mt-4">
              Meet Our Founder
            </Button>
          </div>
          <Image
            src="/api/placeholder/500/500"
            alt="Beauty Essentials Founder"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-blue-600">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Leaf className="w-16 h-16 mx-auto text-green-500 mb-4" />
                ),
                title: "Sustainability",
                description:
                  "We're committed to reducing environmental impact through recyclable packaging and responsibly sourced ingredients.",
              },
              {
                icon: (
                  <Star className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                ),
                title: "Innovation",
                description:
                  "Continuous research drives our product development, ensuring cutting-edge formulations that deliver real results.",
              },
              {
                icon: <Heart className="w-16 h-16 mx-auto text-red-500 mb-4" />,
                title: "Inclusivity",
                description:
                  "Beauty is universal. Our products are designed to work beautifully across all skin types and tones.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300"
              >
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

      {/* Impact and Commitment Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-blue-100 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Our Commitment to You
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            Every product we create undergoes rigorous testing, not just for
            effectiveness, but for ethical standards. We're proud to be
            cruelty-free, use 85% organic ingredients, and contribute 5% of our
            profits to global skincare education initiatives.
          </p>
          <Button color="secondary" variant="solid">
            Learn About Our Impact
          </Button>
        </div>
      </div>
    </div>
  );
};
export default About;
