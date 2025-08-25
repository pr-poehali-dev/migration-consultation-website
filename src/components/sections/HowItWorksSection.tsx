import React from 'react';
import Icon from '@/components/ui/icon';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: "MessageSquare",
      title: "1. Вы пишете",
      description: "\"Что делать, если патент просрочен?\""
    },
    {
      icon: "Video",
      title: "2. Консультация",
      description: "30-60 минут в удобном мессенджере"
    },
    {
      icon: "FileText",
      title: "3. Получаете план",
      description: "Через 24 часа: план + шаблоны + ссылки",
      color: "success"
    },
    {
      icon: "CheckCircle",
      title: "4. Действуете",
      description: "Идёте и делаете сами с пониманием",
      color: "success"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
            Как это работает
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`${step.color === 'success' ? 'bg-success/10' : 'bg-primary/10'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon 
                    name={step.icon} 
                    className={step.color === 'success' ? 'text-success' : 'text-primary'} 
                    size={24} 
                  />
                </div>
                <h3 className="font-semibold mb-2 font-sans">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;