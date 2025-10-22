import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS

const faqs = [
  {
    question: 'How can I Buy Data?',
    answer: (
      <ul>
        <li className='py-1 text-sm'>1. Log in to your account</li>
        <li className='py-1 text-sm'>2. If you don't have an account yet, then click here to register</li>
        <li className='py-1 text-sm'>3. After log in, click 'Fund my account'</li>
        <li className='py-1 text-sm'>4. Select the Method of Payment</li>
        <li className='py-1 text-sm'>5. Click on 'Data bundle' and select any one of your choice</li>
      </ul>
    ),
  },
  {
    question: 'How can I check my data balance?',
    answer: (
      <div>
        <p>General Code for Data Balance is: <code>*323*4#</code></p>
        <p>MTN: <code>*461*4#</code></p>
        <p>9mobile[SME]: <code>*229*9#</code>, 9mobile[Gifting]: <code>*228#</code></p>
        <p>Airtel: <code>*140#</code></p>
        <p>Glo: <code>*127*0#</code></p>
      </div>
    ),
  },
  {
    question: 'How Do I Fund My Wallet?',
    answer: (
      <ul>
        <li className='py-1 text-sm'>1. Bank payment.</li>
        <li className='py-1 text-sm'>2. Online Payment with your ATM card details via Pay stack Payment Gateway.</li>
        <li className='py-1 text-sm'>3. Payment with airtime.</li>
      </ul>
    ),
  },
  {
    question: 'How can I be your agent?',
    answer: 'Our Products can be retailed, as they are affordable. You can retail our Products to others and make a profit. Just make sure your wallet is funded, then you can easily purchase for anyone you wish.',
  },
  {
    question: 'Can I send airtime to you for a data bundle?',
    answer: 'Yes, you can, but payment with airtime attracts a small additional charge. Kindly fund your wallet with airtime.',
  },
  {
    question: 'Are your data plans legit?',
    answer: 'Yes, we are third-party data vendors. We buy in bulk from network providers and resell.',
  },
  {
    question: 'How am I sure you guys are not scammers?',
    answer: "We've been in business for years and have built a reputation from our happy clients. You can check our testimonials page for feedback from people about us.",
  },
  // Add more FAQ items as needed
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-purple-100 px-3">
        <div className="max-w-4xl mx-auto md:px-0 px-3 py-20">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg"
                    data-aos="fade-up">
                    <div className="p-4 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleAccordion(index)}>
                    <span className="font-medium text-lg text-gray-800">{faq.question}</span>
                    <span
                        className={`transform ${openIndex === index ? 'rotate-180' : ''}`}>
                        <svg className="w-6 h-6 text-gray-600"fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </span>
                    </div>
                    {openIndex === index && (
                    <div className="p-4 text-gray-700 leading-7 text-sm" data-aos="fade-left">
                        {faq.answer}
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default FAQ;
