import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PriceCalculator from './PriceCalculator';
import Icon from '@/components/ui/icon';

interface ServicesSectionProps {
  services: any[];
  formData: any;
  formErrors: any;
  selectedService: string;
  selectedPriority: string;
  calculatedPrice: number;
  handleInputChange: (field: string, value: any) => void;
  handleServiceSelect: (serviceId: string) => void;
  handlePriorityChange: (priority: string) => void;
  handleUrgentToggle: (checked: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  formData,
  formErrors,
  selectedService,
  selectedPriority,
  calculatedPrice,
  handleInputChange,
  handleServiceSelect,
  handlePriorityChange,
  handleUrgentToggle,
  handleSubmit
}) => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
            Миграционные услуги в Свердловской области
          </h2>
          <p className="text-lg text-gray-600">
            РВП • ВНЖ • Гражданство • Срочная помощь адвоката
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${service.urgent ? 'border-accent shadow-accent/20' : ''}`}>
              {service.urgent && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-accent text-accent-foreground rounded-l-none rounded-br-none">
                    СРОЧНО
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg leading-tight mb-2 font-sans">
                  {service.title}
                </CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary font-sans">{service.priceText}</span>
                  <span className="text-sm text-gray-500">{service.duration}</span>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Icon name="Check" className="text-success mr-2 mt-0.5" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className={`w-full ${service.urgent ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'}`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <Icon name="ArrowRight" size={16} className="mr-2" />
                      Заказать
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="font-sans">Оформить заявку</DialogTitle>
                      <DialogDescription>
                        Заполните форму, и мы свяжемся с вами в течение 15 минут
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Имя *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={formErrors.name ? 'border-destructive' : ''}
                            placeholder="Ваше имя"
                          />
                          {formErrors.name && (
                            <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={formErrors.phone ? 'border-destructive' : ''}
                            placeholder="+7 999 123-45-67"
                          />
                          {formErrors.phone && (
                            <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="messenger">Мессенджер для связи</Label>
                        <Select value={formData.messenger} onValueChange={(value) => handleInputChange('messenger', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="telegram">Telegram</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="phone">Звонок</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="service">Услуга *</Label>
                        <Select 
                          value={formData.service} 
                          onValueChange={(value) => {
                            handleInputChange('service', value);
                            handleServiceSelect(value);
                          }}
                        >
                          <SelectTrigger className={formErrors.service ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Выберите услугу" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.title} — {service.priceText}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.service && (
                          <p className="text-sm text-destructive mt-1">{formErrors.service}</p>
                        )}
                      </div>

                      <PriceCalculator
                        selectedService={selectedService}
                        selectedPriority={selectedPriority}
                        calculatedPrice={calculatedPrice}
                        formData={formData}
                        handlePriorityChange={handlePriorityChange}
                        handleUrgentToggle={handleUrgentToggle}
                      />

                      <div>
                        <Label htmlFor="message">Дополнительная информация</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Расскажите о своей ситуации..."
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                          <Icon name="Send" size={16} className="mr-2" />
                          Отправить заявку
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;