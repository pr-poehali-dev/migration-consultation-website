import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  const faqItems = [
    {
      question: "Берёте ли вы документы?",
      answer: "Нет. Только консультируем."
    },
    {
      question: "Можно ли оплатить из-за границы?",
      answer: "Нет, оплата проходит только на территории РФ и в рублях."
    },
    {
      question: "На каких языках?",
      answer: "Русский, узбекский, таджикский."
    },
    {
      question: "Сколько времени ждать план?",
      answer: "24 часа с момента оплаты."
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
            Частые вопросы
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline font-sans">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;