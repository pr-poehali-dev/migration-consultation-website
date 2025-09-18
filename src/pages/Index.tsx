import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLPTracker } from '@/hooks/useLPTracker';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const Index = () => {
  const { toast } = useToast();
  useLPTracker(); // Инициализация отслеживания LPTracker
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
    // РВП услуги
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
      urgent: false,
      category: "РВП"
    },
    {
      id: 'patent',
      title: "Пошаговый план: Патент за 5 дней",
      price: 4900,
      priceText: "4 900 ₽",
      duration: "План за 24 часа",
      description: "Подробная инструкция: где, когда, сколько платить",
      features: [
        "Чек-лист: 7 шагов от А до Я",
        "Шаблоны: заявление на патент, уведомление о работе",
        "Срок: план за 24 часа"
      ],
      urgent: false,
      category: "РВП"
    },
    {
      id: 'urgent',
      title: "Спасение: Патент просрочен?",
      price: 7900,
      priceText: "7 900 ₽",
      duration: "Срочно",
      description: "Анализ рисков (депортация, штраф)",
      features: [
        "Что делать: срочные шаги",
        "Как минимизировать последствия",
        "Шаблон заявления о восстановлении срока"
      ],
      urgent: true,
      category: "РВП"
    },
    {
      id: 'rvp-plan',
      title: "РВП: План действий",
      price: 9900,
      priceText: "9 900 ₽",
      duration: "Полное сопровождение",
      description: "Пошаговая инструкция для Свердловской области",
      features: [
        "Список документов (с актуальными требованиями)",
        "Где подавать в Екатеринбурге, сколько ждать",
        "Шаблоны заявлений и согласий"
      ],
      urgent: false,
      category: "РВП"
    },
    
    // ВНЖ услуги
    {
      id: 'vnj-consultation',
      title: "Консультация по ВНЖ",
      price: 3000,
      priceText: "3 000 ₽",
      duration: "Консультация",
      description: "Оценка ваших шансов на получение ВНЖ",
      features: [
        "Требования для Свердловской области",
        "Сроки и стоимость процедуры",
        "Пошаговый план действий"
      ],
      urgent: false,
      category: "ВНЖ"
    },
    {
      id: 'vnj-documents',
      title: "Подготовка документов ВНЖ",
      price: 9900,
      priceText: "9 900 ₽",
      duration: "Подготовка",
      description: "Полный пакет документов",
      features: [
        "Заполнение заявления",
        "Проверка справок и переводов",
        "Письменный план действий"
      ],
      urgent: false,
      category: "ВНЖ"
    },
    {
      id: 'vnj-full',
      title: "Полное сопровождение ВНЖ",
      price: 20000,
      priceText: "20 000 ₽",
      duration: "4-6 месяцев",
      description: "Консультация и подготовка документов",
      features: [
        "Контроль прохождения",
        "Получение готового ВНЖ",
        "Юридическая поддержка на всех этапах"
      ],
      urgent: false,
      category: "ВНЖ"
    },
    
    // Гражданство
    {
      id: 'citizenship-analysis',
      title: "Анализ перспектив гражданства",
      price: 3000,
      priceText: "3 000 ₽",
      duration: "Анализ",
      description: "Оценка возможности получения гражданства",
      features: [
        "Сроки для вашей ситуации",
        "Требования и документы",
        "Альтернативные пути получения"
      ],
      urgent: false,
      category: "Гражданство"
    },
    {
      id: 'citizenship-exams',
      title: "Подготовка к экзаменам",
      price: 9900,
      priceText: "9 900 ₽",
      duration: "Подготовка",
      description: "Материалы для подготовки к экзаменам",
      features: [
        "Тесты по русскому языку и истории",
        "Консультации по сложным вопросам",
        "Индивидуальный план подготовки"
      ],
      urgent: false,
      category: "Гражданство"
    },
    {
      id: 'citizenship-full',
      title: "Полное сопровождение гражданства",
      price: 29990,
      priceText: "29 990 ₽",
      duration: "1-3 года",
      description: "Весь процесс от А до Я",
      features: [
        "Подготовка всех документов",
        "Сопровождение на всех этапах",
        "Получение паспорта РФ"
      ],
      urgent: false,
      category: "Гражданство"
    },
    
    // Срочная помощь адвоката
    {
      id: 'lawyer-detention',
      title: "Вызов адвоката при задержании",
      price: 20000,
      priceText: "20 000 ₽",
      duration: "24/7",
      description: "Выезд адвоката в течение 30 минут",
      features: [
        "Защита прав при задержании полицией",
        "Присутствие при допросе",
        "Составление жалоб и ходатайств",
        "Работаем по всей Свердловской области"
      ],
      urgent: true,
      category: "Срочный адвокат"
    },
    {
      id: 'lawyer-check',
      title: "Проверка задержанного для родственников",
      price: 20000,
      priceText: "20 000 ₽",
      duration: "24/7",
      description: "Выяснение местонахождения задержанного",
      features: [
        "Проверка состояния здоровья",
        "Передача необходимых вещей",
        "Информирование родственников о ситуации",
        "Организация освобождения"
      ],
      urgent: true,
      category: "Срочный адвокат"
    },
    {
      id: 'lawyer-deportation',
      title: "Защита от депортации",
      price: 20000,
      priceText: "20 000 ₽",
      duration: "24/7",
      description: "Анализ оснований для депортации",
      features: [
        "Подготовка возражений",
        "Представительство в суде",
        "Обжалование решений",
        "Срочные меры защиты"
      ],
      urgent: true,
      category: "Срочный адвокат"
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

    // LPTracker событие - выбор услуги
    const selectedServiceObj = services.find(s => s.id === serviceId);
    if (window.lptWg && window.lptWg.push && selectedServiceObj) {
      window.lptWg.push(['event', 'service_selected', {
        service: selectedServiceObj.title,
        price: newPrice
      }]);
    }
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

    // LPTracker событие - включение срочной консультации
    if (window.lptWg && window.lptWg.push && checked) {
      window.lptWg.push(['event', 'urgent_consultation_selected', {
        service: selectedService
      }]);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // LPTracker событие - начало отправки заявки
    if (window.lptWg && window.lptWg.push) {
      window.lptWg.push(['event', 'form_submit_start', {
        service: formData.service,
        urgentConsultation: formData.urgentConsultation
      }]);
    }

    try {
      const selectedServiceObj = services.find(s => s.id === formData.service);
      const serviceTitle = selectedServiceObj ? selectedServiceObj.title : formData.service;

      const response = await fetch('https://functions.poehali.dev/de88ac79-adac-4fb5-a2a7-30f8061abbd7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: serviceTitle
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // LPTracker событие - успешная отправка заявки
        if (window.lptWg && window.lptWg.push) {
          window.lptWg.push(['event', 'form_submit_success', {
            service: serviceTitle,
            urgentConsultation: formData.urgentConsultation,
            price: calculatedPrice
          }]);
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
      } else {
        throw new Error(result.error || 'Ошибка отправки');
      }
    } catch (error) {
      // LPTracker событие - ошибка отправки заявки
      if (window.lptWg && window.lptWg.push) {
        window.lptWg.push(['event', 'form_submit_error', {
          service: formData.service,
          error: error.message
        }]);
      }

      toast({
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами по телефону",
        variant: "destructive"
      });
    }
  };

  const commonProps = {
    formData,
    formErrors,
    services,
    handleInputChange,
    handleServiceSelect,
    handleSubmit
  };

  const breadcrumbItems = [
    { label: 'Главная', href: '/', current: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-body">
      <Header {...commonProps} />
      
      <nav className="container mx-auto px-4 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </nav>
      
      <main>
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
        
        <aside>
          <WhyUsSection />
        </aside>
        
        <TestimonialsSection />
        
        <FAQSection />
        
        <CTASection 
          formData={formData}
          formErrors={formErrors}
          services={services}
          handleInputChange={handleInputChange}
          handleServiceSelect={handleServiceSelect}
          handleSubmit={handleSubmit}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;