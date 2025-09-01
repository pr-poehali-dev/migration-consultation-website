import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CTASectionProps {
  // Пропсы больше не используются, но оставляем для совместимости
  formData?: any;
  formErrors?: any;
  handleInputChange?: (field: string, value: any) => void;
  handleSubmit?: (e: React.FormEvent) => void;
}

const CTASection: React.FC<CTASectionProps> = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-sans">
            Готовы начать?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            5 минут консультации — и вы узнаете, что делать дальше
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-4"
              onClick={() => window.open('https://t.me/migracia_bot', '_blank')}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Написать в Telegram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;