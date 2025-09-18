import React from 'react';
import { useLPTracker } from '@/hooks/useLPTracker';
import { useFormLogic } from '@/hooks/useFormLogic';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const Index = () => {
  useLPTracker(); // Инициализация отслеживания LPTracker
  
  const {
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
  } = useFormLogic();

  const commonProps = {
    formData,
    formErrors,
    services,
    handleInputChange,
    handleServiceSelect,
    handleSubmit
  };

  const breadcrumbItems = [
    { label: 'Главная', href: '/', current: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-body">
      <Header {...commonProps} />
      
      <nav className="container mx-auto px-4 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </nav>
      
      <main>
        <HeroSection {...commonProps} />
        
        <ServicesSection 
          {...commonProps}
          selectedService={selectedService}
          selectedPriority={selectedPriority}
          calculatedPrice={calculatedPrice}
          handlePriorityChange={handlePriorityChange}
          handleUrgentToggle={handleUrgentToggle}
        />
        
        <HowItWorksSection />
        <WhyUsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection {...commonProps} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;