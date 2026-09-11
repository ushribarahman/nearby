import { useState } from "react";
import faqs from "../../data/content/faq";

function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-medium text-gray-500">
            FAQ
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently asked questions
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Everything you need to know about discovering and joining
            events on Nearby.
          </p>
        </div>

        {/* Questions */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-gray-50"
                >
                  <span className="text-sm font-semibold text-gray-900 md:text-base">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-700 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pr-16 text-sm leading-6 text-gray-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default FAQ;