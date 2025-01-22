"use client"
import Footer from "@/components/Sections/Footer";
import Header from "@/components/Sections/Header";
import DownloadApp from "@/components/ui/DownloadApp";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
        <div className={`flex flex-col`}>
            <Header/>
            <main className="flex flex-col justify-center items-center">
                <section className="flex flex-col justify-center items-center text-center mt-20 lg:mt-32">
                    <h1 className={`text-color-zero font-extrabold text-[28px] w-[312px] lg:tetxt-[39px] lg:w-fit`}>Frequently Asked Questions</h1>
                    <p className="text-sm text-colour-five text-center">Any question you want to ask?</p>
                </section>

                <section className="flex flex-col justify-center items-center py-16 bg-white w-full my-12">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {faqs.map((faq, index) => (
                            <section 
                                key={index} 
                                className="flex flex-col bg-color-three p-4 w-[345px] border justify-start items-start self-start rounded-common lg:w-[400px] xl:w-[558px]"
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="flex justify-between items-start w-full cursor-pointer">
                                    <h3 className={`font-medium text-color-zero text-base pr-4 lg:text-lg`}>
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
            </main>
            <DownloadApp />
            <Footer/>
        </div>
    );
}
