import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'BG' | 'EN';

const translations = {
  BG: {
    nav: {
      home: 'Начало',
      services: 'Услуги',
      howItWorks: 'Как работим',
      auctions: 'Търгове',
      offers: 'Предложения',
      whyUs: 'Защо ние',
      testimonials: 'Отзиви',
      faq: 'FAQ',
      contact: 'Контакти',
      cta: 'Безплатна консултация',
    },
    hero: {
      label: '№1 Вносител на автомобили',
      h1a: 'ВАШИЯТ',
      h1b: 'АМЕРИКАНСКИ',
      h1c: 'АВТОМОБИЛ В',
      h1d: 'БЪЛГАРИЯ',
      sub: 'Купуваме директно от търговете в САЩ и Канада. Транспортираме до България и цяла Европа през Ротердам. Организираме всички митнически и регистрационни документи — вие само получавате колата.',
      cta: 'Поръчай автомобил',
      secondary: 'Как работим',
      scrollMore: 'Научете повече',
    },
    stats: {
      delivered: 'Доставени коли',
      delivery: 'Дни доставка',
      transparent: 'Прозрачност',
    },
    howItWorks: {
      label: 'Процесът',
      title: 'Как работи',
      titleAccent: 'стъпка по стъпка',
      sub: 'Прозрачен и опростен процес — ние поемаме всичко сложното, вие само избирате автомобила си.',
    },
    offers: {
      label: 'Горещи предложения',
      title: 'Актуални коли от',
      titleAccent: 'американските търгове',
      sub: 'Избери директно от наличните предложения или поръчай конкретен модел по заявка.',
      inquire: 'Запитване',
      noOffers: 'Няма активни предложения в момента.',
    },
    contact: {
      label: 'Свържете се с нас',
      title: 'Готови ли сте да намерите',
      titleAccent: 'мечтания автомобил?',
      sub: 'Консултацията е напълно безплатна и без ангажимент.',
      name: 'Вашето име',
      phone: 'Телефон',
      email: 'Имейл',
      car: 'Желан автомобил',
      budget: 'Бюджет',
      message: 'Допълнителна информация',
      send: 'Изпрати запитване',
      sending: 'Изпращане...',
      sent: 'Съобщението е изпратено!',
      sentSub: 'Ще се свържем с вас в рамките на 24 часа.',
      newInquiry: 'Изпратете ново запитване',
    },
  },
  EN: {
    nav: {
      home: 'Home',
      services: 'Services',
      howItWorks: 'How It Works',
      auctions: 'Auctions',
      offers: 'Offers',
      whyUs: 'Why Us',
      testimonials: 'Reviews',
      faq: 'FAQ',
      contact: 'Contact',
      cta: 'Free Consultation',
    },
    hero: {
      label: '#1 Car Importer',
      h1a: 'YOUR',
      h1b: 'AMERICAN',
      h1c: 'CAR IN',
      h1d: 'BULGARIA',
      sub: 'We buy directly from US and Canadian auctions. We ship to Bulgaria and all of Europe via Rotterdam. We handle all customs and registration documents — you just receive the car.',
      cta: 'Order a Car',
      secondary: 'How It Works',
      scrollMore: 'Learn More',
    },
    stats: {
      delivered: 'Cars Delivered',
      delivery: 'Days Delivery',
      transparent: 'Transparency',
    },
    howItWorks: {
      label: 'The Process',
      title: 'How It Works',
      titleAccent: 'Step by Step',
      sub: 'A transparent and simplified process — we handle all the complexity, you just choose your car.',
    },
    offers: {
      label: 'Hot Offers',
      title: 'Current cars from',
      titleAccent: 'US auctions',
      sub: 'Choose directly from available listings or order a specific model on request.',
      inquire: 'Inquire',
      noOffers: 'No active offers at the moment.',
    },
    contact: {
      label: 'Get in Touch',
      title: 'Ready to find your',
      titleAccent: 'dream car?',
      sub: 'Consultation is completely free and without obligation.',
      name: 'Your Name',
      phone: 'Phone',
      email: 'Email',
      car: 'Desired Car',
      budget: 'Budget',
      message: 'Additional Information',
      send: 'Send Inquiry',
      sending: 'Sending...',
      sent: 'Message Sent!',
      sentSub: 'We will get back to you within 24 hours.',
      newInquiry: 'Send New Inquiry',
    },
  },
};

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations['BG'];
}>({
  lang: 'BG',
  setLang: () => {},
  t: translations['BG'],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('BG');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
