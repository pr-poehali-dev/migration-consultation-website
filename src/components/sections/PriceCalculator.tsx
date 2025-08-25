import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PriceCalculatorProps {
  selectedService: string;
  selectedPriority: string;
  calculatedPrice: number;
  formData: any;
  handlePriorityChange: (priority: string) => void;
  handleUrgentToggle: (checked: boolean) => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  selectedService,
  selectedPriority,
  calculatedPrice,
  formData,
  handlePriorityChange,
  handleUrgentToggle
}) => {
  if (!selectedService) return null;

  return (
    <Card className="bg-slate-50 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-sans">Калькулятор стоимости</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Приоритет</Label>
          <RadioGroup 
            value={selectedPriority} 
            onValueChange={handlePriorityChange}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal">Обычный (в течение дня)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgent" id="urgent" />
              <Label htmlFor="urgent">Срочный (+1000 ₽)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgentConsult"
            checked={formData.urgentConsultation}
            onCheckedChange={handleUrgentToggle}
          />
          <Label htmlFor="urgentConsult">
            Консультация в течение часа (+500 ₽)
          </Label>
        </div>

        <div className="pt-3 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Итого:</span>
            <span className="text-2xl font-bold text-primary">
              {calculatedPrice.toLocaleString()} ₽
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;