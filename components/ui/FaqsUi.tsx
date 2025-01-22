"use client";
import { useState } from "react";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    {
      question: "How can I contact royal Stone?",
      answer: "You can contact us via our WhatsApp number or email address",
    },
    // Additional FAQ items here
  ];

  return (
    <div className={`flex flex-col mr-8 bg-red-400`}>
      <section className="flex flex-col justify-center items-center bg-white w-full">
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, index) => (
            <section
              key={index}
              className="flex flex-col bg-color-three p-4 w-[345px] shadow-sm justify-start items-start self-start rounded-common lg:w-[330px] xl:w-[500px]"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-start w-full cursor-pointer">
                <h3 className={`text-color-zero text-sm pr-4`}>
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <IoIosArrowUp className="flex-shrink-0" />
                ) : (
                  <IoIosArrowDown className="flex-shrink-0" />
                )}
              </div>
              {openIndex === index && (
                <p className="text-sm text-color-form leading-5 my-2 lg:text-start transition-all duration-300">
                  {faq.answer}
                </p>
              )}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
