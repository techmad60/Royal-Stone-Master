
import { FaqType } from "@/types/Type";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Loading from "./Loading";

interface FaqsProps {
  faqs: FaqType[];
}

const Faqs: React.FC<FaqsProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle the open/close of an accordion item
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col">
      <section className="flex flex-col justify-start items-start w-full mr-8">
        <div className="grid grid-cols-1 gap-6">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <section
                key={faq.id}
                className="flex flex-col bg-color-three p-4 w-[345px] shadow-sm justify-start items-start self-start rounded-common lg:w-[330px] xl:w-[500px]"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-start w-full cursor-pointer">
                  <h3 className="text-color-zero text-sm pr-4">{faq.question}</h3>
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
            ))
          ) : (
            <div><Loading/></div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Faqs;
