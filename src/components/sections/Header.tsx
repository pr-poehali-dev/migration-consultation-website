import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  formData: any;
  formErrors: any;
  services: any[];
  handleInputChange: (field: string, value: any) => void;
  handleServiceSelect: (serviceId: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Header: React.FC<HeaderProps> = ({
  formData,
  formErrors,
  services,
  handleInputChange,
  handleServiceSelect,
  handleSubmit
}) => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-gray-900 font-sans">МиграцияPRO</span>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  // LPTracker событие - клик на кнопку в шапке
                  if (window.lptWg && window.lptWg.push) {
                    window.lptWg.push(['event', 'header_button_click', {
                      button_text: 'Консультант 24/7'
                    }]);
                  }
                }}
              >
                Консультант 24/7
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] sm:max-h-[600px]">
              <DialogHeader>
                <DialogTitle className="font-sans"> Консультант по миграции</DialogTitle>
                <DialogDescription>Получите мгновенные ответы на ваши вопросы - КРУГЛОСУТОЧНО!</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="header-name">Имя *</Label>
                    <Input
                      id="header-name"
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
                    <Label htmlFor="header-phone">Телефон *</Label>
                    <Input
                      id="header-phone"
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
                  <Label htmlFor="header-messenger">Мессенджер для связи</Label>
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
                  <Label htmlFor="header-service">Что вас интересует?</Label>
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
                  <Label htmlFor="header-message">Ваша ситуация</Label>
                  <Textarea
                    id="header-message"
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
      </div>
    </header>
  );
};

export default Header;