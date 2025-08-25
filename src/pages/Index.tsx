import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const services = [
    {
      title: "Старт: Что делать приехав в РФ?",
      price: "1 500 ₽",
      duration: "30 мин",
      description: "Консультация (Telegram/WhatsApp)",
      features: [
        "Проверка статуса: патент, карта, НДФЛ",
        "Ответы на 5 главных вопросов",
        "Ссылки на гос. сайты"
      ],
      urgent: false
    },
    {
      title: "Пошаговый план: Патент за 5 дней",
      price: "2 900 ₽",
      duration: "План за 24 часа",
      description: "Подробная инструкция",
      features: [
        "Где, когда, сколько платить",
        "Чек-лист: 7 шагов от А до Я",
        "Шаблоны заявлений и уведомлений"
      ],
      urgent: false
    },
    {
      title: "Спасение: Патент просрочен?",
      price: "3 500 ₽",
      duration: "Срочно",
      description: "Анализ рисков и решение",
      features: [
        "Анализ рисков (депортация, штраф)",
        "Срочные шаги",
        "Минимизация последствий",
        "Шаблон заявления о восстановлении"
      ],
      urgent: true
    },
    {
      title: "РВП / ВНЖ: План действий",
      price: "4 900 ₽",
      duration: "Полная поддержка",
      description: "Пошаговая инструкция",
      features: [
        "Список документов (актуальные требования)",
        "Где подавать, сколько ждать",
        "Шаблоны заявлений и согласий"
      ],
      urgent: false
    }
  ];

  const testimonials = [
    {
      text: "Приехал, ничего не знал. За 1 500 ₽ мне объяснили всё. Сделал патент сам за 3 дня. Спасибо!",
      author: "Азамат",
      location: "Москва"
    },
    {
      text: "Патент просрочен на 10 дней. Думал — депортируют. Получил план, подал заявление, всё хорошо.",
      author: "Фарход",
      location: "СПб"
    }
  ];

  const faqItems = [
    {
      question: "Берёте ли вы документы?",
      answer: "Нет. Только консультируем."
    },
    {
      question: "Можно ли оплатить из-за границы?",
      answer: "Да, через СБП или крипту."
    },
    {
      question: "На каких языках?",
      answer: "Русский, узбекский, таджикский."
    },
    {
      question: "Сколько времени ждать план?",
      answer: "24 часа с момента оплаты."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-body">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-gray-900 font-sans">МиграцияPRO</span>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Консультация
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Помогли более 500 иностранцам
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-sans">
              Миграция в России:
              <span className="block text-primary">сделайте всё сами</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Мы покажем как. Консультация по WhatsApp/Telegram. 
              Пошаговый план за 24 часа. Без риска. Без посредников.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                <Icon name="MessageSquare" size={20} className="mr-2" />
                Получить консультацию
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                <Icon name="Clock" size={20} className="mr-2" />
                5 минут — узнаете что делать
              </Button>
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

      {/* Services Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
              Услуги (только консультации)
            </h2>
            <p className="text-lg text-gray-600">
              Выберите подходящую консультацию для вашей ситуации
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
                    <span className="text-2xl font-bold text-primary font-sans">{service.price}</span>
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
                  <Button 
                    className={`w-full ${service.urgent ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'}`}
                  >
                    <Icon name="ArrowRight" size={16} className="mr-2" />
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
              Как это работает
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageSquare" className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2 font-sans">1. Вы пишете</h3>
                <p className="text-sm text-gray-600">"Что делать, если патент просрочен?"</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Video" className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2 font-sans">2. Консультация</h3>
                <p className="text-sm text-gray-600">30-60 минут в удобном мессенджере</p>
              </div>
              <div className="text-center">
                <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FileText" className="text-success" size={24} />
                </div>
                <h3 className="font-semibold mb-2 font-sans">3. Получаете план</h3>
                <p className="text-sm text-gray-600">Через 24 часа: план + шаблоны + ссылки</p>
              </div>
              <div className="text-center">
                <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" className="text-success" size={24} />
                </div>
                <h3 className="font-semibold mb-2 font-sans">4. Действуете</h3>
                <p className="text-sm text-gray-600">Идёте и делаете сами с пониманием</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
              Почему мы?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="text-success" size={32} />
              </div>
              <h3 className="font-semibold mb-2 font-sans">Безопасность</h3>
              <p className="text-sm text-gray-600">Не берём ваши документы и деньги — вы в безопасности</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageCircle" className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2 font-sans">Удобство</h3>
              <p className="text-sm text-gray-600">Работаем только через мессенджеры — удобно и анонимно</p>
            </div>
            <div className="text-center">
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" className="text-success" size={32} />
              </div>
              <h3 className="font-semibold mb-2 font-sans">Опыт</h3>
              <p className="text-sm text-gray-600">Помогли более 500 иностранцам</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="DollarSign" className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2 font-sans">Честность</h3>
              <p className="text-sm text-gray-600">Цены фиксированные — никаких доплат</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
              Отзывы
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Icon name="Quote" className="text-primary mb-2" size={24} />
                    <p className="text-gray-700 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-3">
                      <Icon name="User" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 font-sans">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans">
              Частые вопросы
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline font-sans">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              <Button size="lg" className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4">
                <Icon name="MessageSquare" size={20} className="mr-2" />
                Написать в WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                <Icon name="Send" size={20} className="mr-2" />
                Написать в Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="BookOpen" className="text-primary" size={24} />
              <span className="text-xl font-bold text-white font-sans">МиграцияPRO</span>
            </div>
            <p className="text-gray-400 text-sm">
              Консультации по миграции в России • Работаем через мессенджеры • Без посредников
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;