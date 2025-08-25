import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Приехал, ничего не знал. За 1 500 ₽ мне объяснили всё. Сделал патент сам за 3 дня. Спасибо!",
      author: "Азамат",
      location: "Москва"
    },
    {
      text: "Патент просрочен на 10 дней. Думал — депортируют. Получил план, подал заявление, всё хорошо.",
      author: "Фарход",
      location: "СПб"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
            Отзывы
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Icon name="Quote" className="text-primary mb-2" size={24} />
                  <p className="text-gray-700 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-3">
                    <Icon name="User" className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 font-sans">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;