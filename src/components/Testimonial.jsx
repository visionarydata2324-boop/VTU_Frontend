import React, { useEffect } from 'react'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonial = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the duration of the animation
      once: true,     // Trigger animation only once
    });
  }, []);

  // Array of Testimonial Data
  const testimonials = [
    {
      id: 1,
      quote: '"Amazing Service!"',
      content: 'The virtual top-up was seamless, fast, and convenient. I’m definitely coming back.',
      name: 'John Doe',
      role: 'Software Engineer',
      aosDelay: 0
    },
    {
      id: 2,
      quote: '"Highly Recommended!"',
      content: 'The process was incredibly easy and customer support was top-notch. I recommend this service to everyone.',
      name: 'Jane Smith',
      role: 'Business Owner',
      aosDelay: 200
    },
    {
      id: 3,
      quote: '"Best Experience!"',
      content: 'I’ve used many top-up services before, but this one stands out for its speed and reliability.',
      name: 'Alice Johnson',
      role: 'Freelancer',
      aosDelay: 400
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Customized h2 Tag with Custom Colors */}
        <h2 className="text-4xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ADF802] via-[#4169E1] to-[#ADF802] leading-tight mt-4 mb-8">
          What Our Customers Say
        </h2>
        
        <p className="mt-4 text-lg text-gray-600">
          See why our customers trust us for all their virtual top-up needs.
        </p>

        {/* Testimonial Carousel */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {testimonials.map(({ id, quote, content, name, role, image, aosDelay }) => (
            <div
              key={id}
              className="p-6 bg-white rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay={aosDelay}
            >
              <p className="text-xl font-semibold text-gray-800">{quote}</p>
              <p className="mt-4 text-gray-600">{content}</p>
              <div className="mt-6 flex items-center">
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{name}</p>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
