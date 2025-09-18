import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { services } from '@/data/servicesData';

export const useFormLogic = () => {
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

    const selectedServiceObj = services.find(s => s.id === formData.service);
    const serviceTitle = selectedServiceObj ? selectedServiceObj.title : formData.service;

    try {
      // Отправка в Telegram
      const response = await fetch('https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: serviceTitle,
          price: calculatedPrice,
          timestamp: new Date().toLocaleString('ru-RU')
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Успешная отправка в Telegram
        if (window.lptWg && window.lptWg.push) {
          window.lptWg.push(['event', 'form_submit_success', {
            service: serviceTitle,
            urgentConsultation: formData.urgentConsultation,
            price: calculatedPrice,
            method: 'telegram'
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
        return;
      }
      
      throw new Error(result.error || 'Ошибка отправки в Telegram');
      
    } catch (error) {
      // Ошибка отправки
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

  return {
    formData,
    formErrors,
    selectedService,
    selectedPriority,
    calculatedPrice,
    handleInputChange,
    handleServiceSelect,
    handlePriorityChange,
    handleUrgentToggle,
    handleSubmit,
    services
  };
};