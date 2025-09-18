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
      // Попытка отправки через backend
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
        // Дублируем заявку в Telegram (без ожидания результата)
        const sendToTelegram = async () => {
          try {
            await fetch('https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42', {
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
          } catch (error) {
            console.log('Telegram notification failed:', error);
          }
        };
        sendToTelegram();

        // Успешная автоматическая отправка
        if (window.lptWg && window.lptWg.push) {
          window.lptWg.push(['event', 'form_submit_success', {
            service: serviceTitle,
            urgentConsultation: formData.urgentConsultation,
            price: calculatedPrice,
            method: 'backend'
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
      
      // Если backend вернул ошибку лимита (402) - используем mailto
      if (response.status === 402) {
        throw new Error('LIMIT_EXCEEDED');
      }
      
      throw new Error(result.error || 'Ошибка сервера');
      
    } catch (error) {
      // Если ошибка лимита - используем mailto как fallback
      if (error.message === 'LIMIT_EXCEEDED' || error.message.includes('лимит')) {
        const urgentText = formData.urgentConsultation ? "ДА (срочная)" : "Нет";
        const emailBody = `Новая заявка с сайта миграционных услуг

Клиент: ${formData.name}
Телефон: ${formData.phone}
Предпочитаемый мессенджер: ${formData.messenger}
Услуга: ${serviceTitle}
Срочная консультация: ${urgentText}
Стоимость: ${calculatedPrice} ₽

Сообщение:
${formData.message || 'Не указано'}

---
Время: ${new Date().toLocaleString('ru-RU')}`;

        const mailtoLink = `mailto:89126994560@mail.ru?subject=${encodeURIComponent(`Новая заявка: ${serviceTitle}`)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        
        setTimeout(() => {
          // Дублируем заявку в Telegram (без ожидания результата)
          const sendToTelegram = async () => {
            try {
              await fetch('https://functions.poehali.dev/a9299a8a-df29-4247-808f-4903c8fb7c42', {
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
            } catch (error) {
              console.log('Telegram notification failed:', error);
            }
          };
          sendToTelegram();

          if (window.lptWg && window.lptWg.push) {
            window.lptWg.push(['event', 'form_submit_success', {
              service: serviceTitle,
              urgentConsultation: formData.urgentConsultation,
              price: calculatedPrice,
              method: 'mailto'
            }]);
          }

          toast({
            title: "Заявка готова к отправке!",
            description: "Ваша заявка открылась в почтовом клиенте. Нажмите 'Отправить'.",
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
        }, 500);
        return;
      }

      // Обычная ошибка
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