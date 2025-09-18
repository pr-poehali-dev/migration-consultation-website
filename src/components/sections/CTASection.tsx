import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CTASectionProps {
  formData?: any;
  formErrors?: any;
  services?: any[];
  handleInputChange?: (field: string, value: any) => void;
  handleServiceSelect?: (serviceId: string) => void;
  handleSubmit?: (e: React.FormEvent) => void;
}

const CTASection: React.FC<CTASectionProps> = ({
  formData,
  formErrors,
  services = [],
  handleInputChange,
  handleServiceSelect,
  handleSubmit
}) => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-sans">
            Готовы начать?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            5 минут консультации — и вы узнаете, что делать дальше
          </p>
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-4"
                >
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Получить консультацию
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="font-sans">Запрос консультации</DialogTitle>
                  <DialogDescription>
                    Заполните форму, и мы свяжемся с вами в течение 15 минут
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cta-name">Имя *</Label>
                      <Input
                        id="cta-name"
                        value={formData?.name || ''}
                        onChange={(e) => handleInputChange?.('name', e.target.value)}
                        className={formErrors?.name ? 'border-destructive' : ''}
                        placeholder="Ваше имя"
                      />
                      {formErrors?.name && (
                        <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cta-phone">Телефон *</Label>
                      <Input
                        id="cta-phone"
                        value={formData?.phone || ''}
                        onChange={(e) => handleInputChange?.('phone', e.target.value)}
                        className={formErrors?.phone ? 'border-destructive' : ''}
                        placeholder="+7 999 123-45-67"
                      />
                      {formErrors?.phone && (
                        <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cta-messenger">Мессенджер для связи</Label>
                    <Select value={formData?.messenger || 'telegram'} onValueChange={(value) => handleInputChange?.('messenger', value)}>
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
                    <Label htmlFor="cta-service">Что вас интересует?</Label>
                    <Select 
                      value={formData?.service || ''} 
                      onValueChange={(value) => {
                        handleInputChange?.('service', value);
                        handleServiceSelect?.(value);
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
                    <Label htmlFor="cta-message">Ваша ситуация</Label>
                    <Textarea
                      id="cta-message"
                      value={formData?.message || ''}
                      onChange={(e) => handleInputChange?.('message', e.target.value)}
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
      </div>
    </section>
  );
};

export default CTASection;