import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

const Index = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('normal');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    messenger: 'telegram',
    message: '',
    service: '',
    urgentConsultation: false
  });
  const [formErrors, setFormErrors] = useState({});

  const services = [
    {
      id: 'start',
      title: "Старт: Что делать приехав в РФ?",
      price: 1500,
      priceText: "1 500 ₽",
      duration: "30 мин",
      description: "Консультация (Telegram/WhatsApp)",
      features: [
        "Проверка статуса: патент, карта, НДФЛ",
        "Ответы на 5 главных вопросов",
        "Ссылки на гос. сайты"
      ],
      urgent: false
    },
    {
      id: 'patent',
      title: "Пошаговый план: Патент за 5 дней",
      price: 2900,
      priceText: "2 900 ₽",
      duration: "План за 24 часа",
      description: "Подробная инструкция",
      features: [
        "Где, когда, сколько платить",
        "Чек-лист: 7 шагов от А до Я",
        "Шаблоны заявлений и уведомлений"
      ],
      urgent: false
    },
    {
      id: 'urgent',
      title: "Спасение: Патент просрочен?",
      price: 3500,
      priceText: "3 500 ₽",
      duration: "Срочно",
      description: "Анализ рисков и решение",
      features: [
        "Анализ рисков (депортация, штраф)",
        "Срочные шаги",
        "Минимизация последствий",
        "Шаблон заявления о восстановлении"
      ],
      urgent: true
    },
    {
      id: 'residence',
      title: "РВП / ВНЖ: План действий",
      price: 4900,
      priceText: "4 900 ₽",
      duration: "Полная поддержка",
      description: "Пошаговая инструкция",
      features: [
        "Список документов (актуальные требования)",
        "Где подавать, сколько ждать",
        "Шаблоны заявлений и согласий"
      ],
      urgent: false
    }
  ];

  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = 'Имя обязательно';
    if (!data.phone.trim()) errors.phone = 'Телефон обязателен';
    if (!data.service) errors.service = 'Выберите услугу';
    if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
      errors.phone = 'Некорректный номер телефона';
    }
    return errors;
  };

  const calculatePrice = (serviceId, priority, urgentConsult) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return 0;
    
    let price = service.price;
    if (priority === 'urgent') price += 1000;
    if (urgentConsult) price += 500;
    
    return price;
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setFormData(prev => ({ ...prev, service: serviceId }));
    const newPrice = calculatePrice(serviceId, selectedPriority, formData.urgentConsultation);
    setCalculatedPrice(newPrice);
  };

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
    if (selectedService) {
      const newPrice = calculatePrice(selectedService, priority, formData.urgentConsultation);
      setCalculatedPrice(newPrice);
    }
  };

  const handleUrgentToggle = (checked) => {
    setFormData(prev => ({ ...prev, urgentConsultation: checked }));
    if (selectedService) {
      const newPrice = calculatePrice(selectedService, selectedPriority, checked);
      setCalculatedPrice(newPrice);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 15 минут",
    });

    setFormData({
      name: '',
      phone: '',
      messenger: 'telegram',
      message: '',
      service: '',
      urgentConsultation: false
    });
    setSelectedService('');
    setCalculatedPrice(0);
    setFormErrors({});
  };

  const commonProps = {
    formData,
    formErrors,
    services,
    handleInputChange,
    handleServiceSelect,
    handleSubmit
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-body">
      <Header {...commonProps} />
      
      <HeroSection {...commonProps} />
      
      <ServicesSection 
        {...commonProps}
        selectedService={selectedService}
        selectedPriority={selectedPriority}
        calculatedPrice={calculatedPrice}
        handlePriorityChange={handlePriorityChange}
        handleUrgentToggle={handleUrgentToggle}
      />
      
      <HowItWorksSection />
      
      <WhyUsSection />
      
      <TestimonialsSection />
      
      <FAQSection />
      
      <CTASection 
        formData={formData}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      
      <Footer />
    </div>
  );
};

export default Index;