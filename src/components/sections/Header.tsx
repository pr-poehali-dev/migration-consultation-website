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
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Bot" size={18} className="mr-2" />
                ИИ Консультант
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] sm:max-h-[600px]">
              <DialogHeader>
                <DialogTitle className="font-sans">ИИ Консультант по миграции</DialogTitle>
                <DialogDescription>
                  Получите мгновенные ответы на ваши вопросы от нашего ИИ агента
                </DialogDescription>
              </DialogHeader>

              <div className="w-full h-[500px] border rounded-lg overflow-hidden">
                <iframe 
                  allow="microphone;autoplay" 
                  style={{width: '100%', height: '100%', border: 'none'}}
                  src="https://functions.pro-talk.ru/api/v1.0/chatgpt_widget_dialog_api?record_id=recYnAPYvshTKXGtV&promt_id=33618&lang=ru&fullscreen=0&voice=1&file=1&circle=1"
                  title="ИИ Консультант по миграции"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;