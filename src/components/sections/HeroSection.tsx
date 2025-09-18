import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  formData: any;
  formErrors: any;
  services: any[];
  handleInputChange: (field: string, value: any) => void;
  handleServiceSelect: (serviceId: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  formData,
  formErrors,
  services,
  handleInputChange,
  handleServiceSelect,
  handleSubmit
}) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Помогли более 500 иностранцам
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-sans">
            Миграционные услуги в Екатеринбурге:
            <span className="block text-primary">РВП, ВНЖ, Гражданство РФ</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Получение документов для легализации в России. Консультации опытных юристов по патентам, РВП, виду на жительство и гражданству. Пошаговые планы за 24 часа. Работаем только в Свердловской области.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Получить консультацию
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="font-sans">Быстрая заявка</DialogTitle>
                  <DialogDescription>
                    5 минут — и вы узнаете, что делать дальше
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-name">Имя *</Label>
                      <Input
                        id="hero-name"
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
                      <Label htmlFor="hero-phone">Телефон *</Label>
                      <Input
                        id="hero-phone"
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
                    <Label htmlFor="hero-messenger">Мессенджер для связи</Label>
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
                    <Label htmlFor="hero-service">Что вас интересует?</Label>
                    <Select 
                      value={formData.service} 
                      onValueChange={(value) => {
                        handleInputChange('service', value);
                        handleServiceSelect(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="hero-message">Ваша ситуация</Label>
                    <Textarea
                      id="hero-message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Кратко опишите что произошло..."
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
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-4"
                >
                  <Icon name="Clock" size={20} className="mr-2" />
                  5 минут — узнаете что делать
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="font-sans">Быстрая консультация</DialogTitle>
                  <DialogDescription>
                    5 минут — и вы узнаете, что делать дальше
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quick-name">Имя *</Label>
                      <Input
                        id="quick-name"
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
                      <Label htmlFor="quick-phone">Телефон *</Label>
                      <Input
                        id="quick-phone"
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
                    <Label htmlFor="quick-messenger">Мессенджер для связи</Label>
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
                    <Label htmlFor="quick-service">Что вас интересует?</Label>
                    <Select 
                      value={formData.service} 
                      onValueChange={(value) => {
                        handleInputChange('service', value);
                        handleServiceSelect(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quick-message">Ваша ситуация</Label>
                    <Textarea
                      id="quick-message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Кратко опишите что произошло..."
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
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <Icon name="Shield" className="mx-auto mb-2 text-success" size={32} />
              <p className="text-sm font-medium text-gray-700">Безопасно</p>
            </div>
            <div className="text-center">
              <Icon name="Zap" className="mx-auto mb-2 text-primary" size={32} />
              <p className="text-sm font-medium text-gray-700">Быстро</p>
            </div>
            <div className="text-center">
              <Icon name="Users" className="mx-auto mb-2 text-accent" size={32} />
              <p className="text-sm font-medium text-gray-700">500+ клиентов</p>
            </div>
            <div className="text-center">
              <Icon name="FileCheck" className="mx-auto mb-2 text-success" size={32} />
              <p className="text-sm font-medium text-gray-700">Шаблоны</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;