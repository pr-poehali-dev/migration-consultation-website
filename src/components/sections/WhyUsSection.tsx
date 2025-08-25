import React from 'react';
import Icon from '@/components/ui/icon';

const WhyUsSection = () => {
  const benefits = [
    {
      icon: "Shield",
      title: "Безопасность",
      description: "Не берём ваши документы и деньги — вы в безопасности",
      color: "success"
    },
    {
      icon: "MessageCircle",
      title: "Удобство",
      description: "Работаем только через мессенджеры — удобно и анонимно",
      color: "primary"
    },
    {
      icon: "Users",
      title: "Опыт",
      description: "Помогли более 500 иностранцам",
      color: "success"
    },
    {
      icon: "DollarSign",
      title: "Честность",
      description: "Цены фиксированные — никаких доплат",
      color: "primary"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
            Почему мы?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className={`${benefit.color === 'success' ? 'bg-success/10' : 'bg-primary/10'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon 
                  name={benefit.icon} 
                  className={benefit.color === 'success' ? 'text-success' : 'text-primary'} 
                  size={32} 
                />
              </div>
              <h3 className="font-semibold mb-2 font-sans">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;