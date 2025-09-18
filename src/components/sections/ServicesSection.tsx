import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  // Группируем услуги по категориям
  const serviceCategories = {
    'РВП': services.filter(s => s.category === 'РВП'),
    'ВНЖ': services.filter(s => s.category === 'ВНЖ'),
    'Гражданство': services.filter(s => s.category === 'Гражданство'),
    'Срочный адвокат': services.filter(s => s.category === 'Срочный адвокат')
  };

  const categoryIcons = {
    'РВП': 'FileText',
    'ВНЖ': 'Home',
    'Гражданство': 'Award', 
    'Срочный адвокат': 'Shield'
  };

  const categoryDescriptions = {
    'РВП': 'Разрешение на временное проживание • 1 500₽ - 9 900₽',
    'ВНЖ': 'Вид на жительство в РФ за 4-6 месяцев • 3 000₽ - 20 000₽',
    'Гражданство': 'Российское гражданство за 1-3 года • 3 000₽ - 29 990₽',
    'Срочный адвокат': 'Экстренная правовая защита 24/7 • 20 000₽'
  };

  const renderServiceCard = (service: any) => {
    const categoryBorders = {
      'РВП': 'border-l-4 border-l-green-500',
      'ВНЖ': 'border-l-4 border-l-blue-500',
      'Гражданство': 'border-l-4 border-l-yellow-500',
      'Срочный адвокат': 'border-l-4 border-l-red-500'
    };
    
    const categoryBadges = {
      'РВП': 'bg-green-100 text-green-800',
      'ВНЖ': 'bg-blue-100 text-blue-800',  
      'Гражданство': 'bg-yellow-100 text-yellow-800',
      'Срочный адвокат': 'bg-red-100 text-red-800'
    };
    
    return (
      <Card key={service.id} className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${categoryBorders[service.category as keyof typeof categoryBorders]} ${service.urgent ? 'border-accent shadow-accent/20' : ''}`}>
      {service.urgent && (
        <div className="absolute top-0 right-0">
          <Badge className="bg-accent text-accent-foreground rounded-l-none rounded-br-none">
            СРОЧНО
          </Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge className={`text-xs ${categoryBadges[service.category as keyof typeof categoryBadges]} mb-2`}>
            {service.category}
          </Badge>
        </div>
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
          {service.features.map((feature: string, i: number) => (
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
              <Icon name="ShoppingCart" size={16} className="mr-2" />
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

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить заявку
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
  };

  return (
    <section className="py-16 bg-slate-50" itemScope itemType="https://schema.org/Service">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
            Миграционные услуги в Свердловской области
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Консультации и полное сопровождение получения документов
          </p>
        </div>

        <Tabs defaultValue="РВП" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 mb-8 p-2 h-auto bg-white shadow-sm">
            {Object.keys(serviceCategories).map((category) => {
              const categoryColors = {
                'РВП': 'data-[state=active]:bg-green-100 data-[state=active]:text-green-800 data-[state=active]:border-green-300 hover:bg-green-50',
                'ВНЖ': 'data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 data-[state=active]:border-blue-300 hover:bg-blue-50',
                'Гражданство': 'data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800 data-[state=active]:border-yellow-300 hover:bg-yellow-50',
                'Срочный адвокат': 'data-[state=active]:bg-red-100 data-[state=active]:text-red-800 data-[state=active]:border-red-300 hover:bg-red-50'
              };
              
              return (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className={`text-xs sm:text-sm p-3 sm:p-4 h-auto flex-col sm:flex-row gap-1 sm:gap-2 border-2 border-transparent transition-all ${categoryColors[category as keyof typeof categoryColors]}`}
                >
                  <Icon name={categoryIcons[category as keyof typeof categoryIcons]} size={16} className="" />
                  <span className="font-medium">{category}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {Object.entries(serviceCategories).map(([category, categoryServices]) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-sans">
                  <Icon name={categoryIcons[category as keyof typeof categoryIcons]} size={24} className="inline mr-2" />
                  {category === 'РВП' ? '🟢 РВП - Разрешение на временное проживание' :
                   category === 'ВНЖ' ? '🔵 ВНЖ - Вид на жительство в РФ' :
                   category === 'Гражданство' ? '🟡 Гражданство РФ' :
                   '🔴 Срочная помощь адвоката'}
                </h3>
                <p className="text-gray-600">
                  {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                </p>
              </div>
              
              <div className={`grid gap-6 ${
                categoryServices.length === 1 ? 'max-w-md mx-auto' :
                categoryServices.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
                categoryServices.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto' :
                'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {categoryServices.map(renderServiceCard)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;