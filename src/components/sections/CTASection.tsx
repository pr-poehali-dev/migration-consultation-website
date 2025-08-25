import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CTASectionProps {
  formData: any;
  formErrors: any;
  handleInputChange: (field: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CTASection: React.FC<CTASectionProps> = ({
  formData,
  formErrors,
  handleInputChange,
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4">
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Написать в WhatsApp
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="font-sans">Связаться с нами</DialogTitle>
                  <DialogDescription>
                    Оставьте заявку, и мы свяжемся с вами в WhatsApp в течение 15 минут
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cta-name">Имя *</Label>
                      <Input
                        id="cta-name"
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
                      <Label htmlFor="cta-phone">WhatsApp *</Label>
                      <Input
                        id="cta-phone"
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
                    <Label htmlFor="cta-message">Ваш вопрос</Label>
                    <Textarea
                      id="cta-message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Что вас беспокоит? Опишите ситуацию..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить в WhatsApp
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button 
              size="lg" 
              className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-4"
              onClick={() => window.open('https://t.me/migracia_bot', '_blank')}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Написать в Telegram
            </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="font-sans">Связаться в Telegram</DialogTitle>
                  <DialogDescription>
                    Оставьте заявку для связи в Telegram
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tg-name">Имя *</Label>
                      <Input
                        id="tg-name"
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
                      <Label htmlFor="tg-phone">Telegram *</Label>
                      <Input
                        id="tg-phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={formErrors.phone ? 'border-destructive' : ''}
                        placeholder="@username или телефон"
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tg-message">Ваш вопрос</Label>
                    <Textarea
                      id="tg-message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Что вас беспокоит? Опишите ситуацию..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить в Telegram
                    </Button>
                  </div>
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