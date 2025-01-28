import Faqs from "@/components/ui/Faqs";
import NavigatorTwo from "@/components/ui/NavigatorTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FaqResponse, FaqType } from "@/types/Type";
import { useEffect, useState } from "react";
import SettingsParent from "../SettingsParent";
  
export default function FAQs() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("faqsSetting");
  const [faqs, setFaqs] = useState<FaqType[]>([]);

  // Fetch FAQs data from the API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/faq"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }

        const data:FaqResponse = await response.json();

        // Extract FAQ data and ensure `status` is always present
        if (data.status && data.data?.data) {
          const transformedFaqs: FaqType[] = data.data.data.map((faq) => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            status: faq.status || "active", // Default status if missing
          }));

          setFaqs(transformedFaqs);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div>
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : (
        <div>
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Faqs",
                onClick: () => setCurrentPage("faqsSetting"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">
              Frequently Asked Questions
            </h1>
          </div>
          <div className="mt-4">
            {/* Pass the fetched FAQ data to the Faqs component */}
            <Faqs faqs={faqs} />
          </div>
        </div>
      )}
    </div>
  );
}
