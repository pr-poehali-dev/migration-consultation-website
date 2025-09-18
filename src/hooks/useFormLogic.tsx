import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { services } from '@/data/servicesData';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useApiClient } from '@/hooks/useApiClient';
import { useFormValidation, validationRules } from '@/hooks/useFormValidation';

export const useFormLogic = () => {
  const { toast } = useToast();
  const { trackServiceSelection, trackFormSubmit, trackFormError } = useAnalytics();
  const { post, isLoading } = useApiClient();
  const [selectedService, setSelectedService] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('normal');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const initialFormData = {
    name: '',
    phone: '',
    messenger: 'telegram',
    message: '',
    service: '',
    urgentConsultation: false
  };

  const { 
    data: formData, 
    errors: formErrors, 
    setValue: setFormField,
    validate,
    reset: resetForm 
  } = useFormValidation(initialFormData);

  const formValidationRules = {
    name: validationRules.required('Имя обязательно'),
    phone: {
      ...validationRules.required('Телефон обязателен'),
      ...validationRules.phone('Некорректный номер телефона')
    },
    service: validationRules.required('Выберите услугу')
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
    setFormField('service', serviceId);
    const newPrice = calculatePrice(serviceId, selectedPriority, formData.urgentConsultation);
    setCalculatedPrice(newPrice);

    // Аналитика - выбор услуги
    const selectedServiceObj = services.find(s => s.id === serviceId);
    if (selectedServiceObj) {
      trackServiceSelection(selectedServiceObj.title, newPrice);
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
    setFormField('urgentConsultation', checked);
    if (selectedService) {
      const newPrice = calculatePrice(selectedService, selectedPriority, checked);
      setCalculatedPrice(newPrice);
    }
  };

  const handleInputChange = (field, value) => {
    setFormField(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate(formValidationRules)) {
      return;
    }

    const selectedServiceObj = services.find(s => s.id === formData.service);
    const serviceTitle = selectedServiceObj ? selectedServiceObj.title : formData.service;

    try {
      // Отправка в Telegram через API клиент
      const response = await post(
        'https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42',
        {
          ...formData,
          service: serviceTitle,
          price: calculatedPrice,
          website: 'migracia.pro',
          timestamp: new Date().toLocaleString('ru-RU')
        },
        {},
        'telegram-submit'
      );

      if (response.success) {
        // Аналитика - успешная отправка
        trackFormSubmit({
          service: serviceTitle,
          urgentConsultation: formData.urgentConsultation,
          price: calculatedPrice,
          method: 'telegram'
        });

        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в течение 15 минут",
        });

        resetForm();
        setSelectedService('');
        setCalculatedPrice(0);
        return;
      }
      
      throw new Error(response.error || 'Ошибка отправки в Telegram');
      
    } catch (error) {
      // Аналитика - ошибка отправки
      trackFormError(error.message, 'consultation');

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
    isSubmitting: isLoading('telegram-submit'),
    handleInputChange,
    handleServiceSelect,
    handlePriorityChange,
    handleUrgentToggle,
    handleSubmit,
    services
  };
};