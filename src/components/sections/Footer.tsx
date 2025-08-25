import React from 'react';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="BookOpen" className="text-primary" size={24} />
            <span className="text-xl font-bold text-white font-sans">МиграцияPRO</span>
          </div>
          <p className="text-gray-400 text-sm">
            Консультации по миграции в России • Работаем через мессенджеры • Без посредников
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;