import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    icon: 'Home',
    title: 'Дезинфекция квартир',
    description: 'Полная обработка жилых помещений современными средствами',
    price: 'от 3 000 ₽',
  },
  {
    icon: 'Building2',
    title: 'Обработка офисов',
    description: 'Профессиональная дезинфекция рабочих пространств',
    price: 'от 5 000 ₽',
  },
  {
    icon: 'Store',
    title: 'Дезинфекция магазинов',
    description: 'Санитарная обработка торговых площадей',
    price: 'от 7 000 ₽',
  },
  {
    icon: 'Car',
    title: 'Обработка автомобилей',
    description: 'Глубокая дезинфекция салона авто',
    price: 'от 2 500 ₽',
  },
  {
    icon: 'Warehouse',
    title: 'Складские помещения',
    description: 'Дезинфекция больших площадей',
    price: 'от 10 000 ₽',
  },
  {
    icon: 'Utensils',
    title: 'Заведения общепита',
    description: 'Специализированная обработка кухонь и залов',
    price: 'от 8 000 ₽',
  },
];

const guarantees = [
  {
    icon: 'ShieldCheck',
    title: 'Безопасные средства',
    description: 'Используем только сертифицированные препараты',
  },
  {
    icon: 'Award',
    title: 'Опыт 10+ лет',
    description: 'Более 10 000 успешно выполненных заказов',
  },
  {
    icon: 'Clock',
    title: 'Быстрая обработка',
    description: 'Выезд в день обращения',
  },
  {
    icon: 'FileCheck',
    title: 'Документы',
    description: 'Предоставляем все необходимые акты и сертификаты',
  },
];

const certificates = [
  { name: 'Роспотребнадзор', number: 'РПН-2024-001234' },
  { name: 'Минздрав России', number: 'МЗ-2024-005678' },
  { name: 'ISO 9001:2015', number: 'ISO-9001-2024' },
  { name: 'СЭС', number: 'СЭС-2024-009876' },
];

const faqItems = [
  {
    question: 'Безопасна ли дезинфекция для детей и животных?',
    answer: 'Да, мы используем только сертифицированные средства, безопасные для людей и животных. После проветривания помещение полностью готово к использованию.',
  },
  {
    question: 'Как долго длится обработка?',
    answer: 'Время зависит от площади помещения. Обработка квартиры до 50 м² занимает 1-2 часа. После обработки рекомендуется проветрить помещение в течение 30-60 минут.',
  },
  {
    question: 'Нужно ли готовить помещение к дезинфекции?',
    answer: 'Желательно убрать продукты питания, посуду и личные вещи. Наши специалисты помогут подготовить помещение при необходимости.',
  },
  {
    question: 'Даёте ли вы гарантию на свои услуги?',
    answer: 'Да, мы даём официальную гарантию на все виды работ сроком до 6 месяцев. Предоставляем полный пакет документов.',
  },
  {
    question: 'Как часто нужно проводить дезинфекцию?',
    answer: 'Для профилактики рекомендуется проводить дезинфекцию 1-2 раза в год. При повышенном риске заражения - чаще.',
  },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

export default function Index() {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    comment: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedTime) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите дату и время',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setFormData({ name: '', phone: '', service: '', comment: '' });
    setDate(undefined);
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl">
                <Icon name="Sparkles" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">ДезинфектЦентр</h1>
                <p className="text-sm text-muted-foreground">Профессиональная дезинфекция</p>
              </div>
            </div>
            <a href="#booking">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Записаться онлайн
              </Button>
            </a>
          </div>
        </div>
      </header>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-secondary text-white">
                <Icon name="Star" size={16} className="mr-1" />
                Лидер рынка с 2014 года
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Надёжная защита <span className="gradient-text">вашего пространства</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Профессиональная дезинфекция помещений любого типа. 
                Современное оборудование и сертифицированные средства. Гарантия качества.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#booking">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Записаться сейчас
                  </Button>
                </a>
                <a href="tel:+74951234567">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Icon name="Phone" size={20} className="mr-2" />
                    +7 (495) 123-45-67
                  </Button>
                </a>
              </div>
            </div>
            <div className="animate-slide-up">
              <img 
                src="https://cdn.poehali.dev/projects/ae7e1141-bcf5-470b-8ce9-18c914f893b6/files/f4740d42-87bb-45a0-84ed-3d50231e8f48.jpg" 
                alt="Дезинфекция помещений" 
                className="rounded-3xl shadow-2xl hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Наши <span className="gradient-text">услуги</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Профессиональная дезинфекция для любых типов помещений
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-scale border-2 hover:border-primary transition-all">
                <CardHeader>
                  <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-xl w-fit mb-4">
                    <Icon name={service.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="guarantees" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Наши <span className="gradient-text">гарантии</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((item, index) => (
              <Card key={index} className="text-center hover-scale bg-white">
                <CardHeader>
                  <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon name={item.icon as any} size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Сертификаты</span> и лицензии
            </h2>
            <p className="text-xl text-muted-foreground">
              Все наши услуги сертифицированы и лицензированы
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certificates.map((cert, index) => (
              <Card key={index} className="hover-scale border-2">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-xl mb-4">
                    <Icon name="Award" size={40} className="text-primary mx-auto" />
                  </div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <CardDescription className="font-mono text-xs">{cert.number}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Вопросы и <span className="gradient-text">ответы</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border-2">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Онлайн <span className="gradient-text">запись</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Выберите удобные дату и время для обработки
              </p>
            </div>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Форма записи</CardTitle>
                <CardDescription>Заполните данные, и мы свяжемся с вами</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input 
                        id="name" 
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Выберите услугу</Label>
                    <select
                      id="service"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      required
                    >
                      <option value="">Выберите услугу</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Дата</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Icon name="Calendar" className="mr-2" size={16} />
                            {date ? format(date, 'PPP', { locale: ru }) : 'Выберите дату'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            locale={ru}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Время</Label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      >
                        <option value="">Выберите время</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Комментарий</Label>
                    <Textarea 
                      id="comment" 
                      placeholder="Дополнительная информация"
                      value={formData.comment}
                      onChange={(e) => setFormData({...formData, comment: e.target.value})}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Phone" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Телефон</h3>
              <p className="text-lg">+7 (495) 123-45-67</p>
              <p className="text-sm opacity-80">Круглосуточно</p>
            </div>
            <div>
              <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Icon name="Mail" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-lg">info@dezinfekt.ru</p>
              <p className="text-sm opacity-80">Ответим в течение часа</p>
            </div>
            <div>
              <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Icon name="MapPin" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Адрес</h3>
              <p className="text-lg">Москва, ул. Примерная, 123</p>
              <p className="text-sm opacity-80">Работаем по всей Москве</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © 2024 ДезинфектЦентр. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
