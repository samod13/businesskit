/**
 * ==============================================================================
 * BUSINESSKIT MVP — ЄДИНИЙ КОНФІГУРАЦІЙНИЙ ФАЙЛ (WHITE-LABEL CONFIG)
 * ==============================================================================
 * 
 * Щоб адаптувати цей додаток під нового клієнта за 1-2 хвилини:
 * Змініть значення в об'єкті `businessConfig` нижче:
 *  - Назва бізнесу (businessName)
 *  - Категорія (category)
 *  - Логотип та фон (logoUrl, coverUrl)
 *  - Фірмові кольори (primaryColor, accentColor)
 *  - Контакти та соцмережі (contact)
 *  - Каталог послуг (services)
 */

export const businessConfig = {
  // 1. БАЗОВА ІНФОРМАЦІЯ ПРО БІЗНЕС
  businessName: "Luxe Studio",
  category: "Салон краси & SPA",
  tagline: "Преміальний догляд, індивідуальний стиль та релакс для вашої впевненості",
  rating: 4.95,
  reviewsCount: 142,

  // 2. БРЕНДИНГ ТА МЕДІА (URL або прямі посилання)
  logoUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=250&q=80",
  coverUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",

  // 3. ФІРМОВІ КОЛЬОРИ (HEX-коди — автоматично стилізують увесь додаток)
  // Наприклад: Салон ("#7c3aed", "#db2777"), Барбершоп ("#d97706", "#475569"), Автосервіс ("#0284c7", "#ef4444")
  primaryColor: "#7c3aed", // Основний колір кнопок, активних елементів (Purple)
  accentColor: "#db2777",  // Акцентний колір бейджів, знижок, градієнтів (Pink)
  currency: "грн",

  // 4. КОНТАКТНА ІНФОРМАЦІЯ
  contact: {
    phone: "+380 67 987 65 43",
    address: "вул. Хрещатик, 22, Київ",
    workingHours: "Пн-Нд: 09:00 - 21:00",
    instagram: "@luxe_studio_kyiv",
    telegramBot: "@LuxeStudioBookBot",
    notificationChannel: "Адміністратор Luxe Studio"
  },

  // 5. ДИНАМІЧНИЙ КАТАЛОГ ПОСЛУГ ДЛЯ ЗАПИСУ
  services: [
    {
      id: "srv-1",
      name: "Стрижка та авторське укладання",
      category: "Волосся",
      price: 650,
      duration: "45 хв",
      description: "Миючий SPA-ритуал, підбір форми за типом обличчя, моделювання та фінішний стайлінг.",
      popular: true,
      icon: "Scissors"
    },
    {
      id: "srv-2",
      name: "Комплексний преміум-манікюр",
      category: "Нігті",
      price: 750,
      duration: "60 хв",
      description: "Апаратне або комбіноване очищення, доглядове масло, покриття стійким гель-лаком.",
      popular: true,
      icon: "Sparkles"
    },
    {
      id: "srv-3",
      name: "SPA-догляд та масаж обличчя",
      category: "Догляд",
      price: 1200,
      duration: "60 хв",
      description: "М'яка ексфоліація, лімфодренажний масаж, альгінатна відновлююча маска та сироватка.",
      popular: false,
      icon: "Heart"
    },
    {
      id: "srv-4",
      name: "Архітектура та ламінування брів",
      category: "Брови",
      price: 550,
      duration: "40 хв",
      description: "Моделювання форми, безпечне фарбування хною або фарбою та фіксація кератином.",
      popular: false,
      icon: "Eye"
    },
    {
      id: "srv-5",
      name: "Денний / Коктейльний макіяж",
      category: "Макіяж",
      price: 900,
      duration: "50 хв",
      description: "Ідеальний рівний тон, акцент на очі або губи, професійна фіксація на весь день.",
      popular: false,
      icon: "Smile"
    },
    {
      id: "srv-6",
      name: "Педикюр з масажем стоп",
      category: "Нігті",
      price: 850,
      duration: "60 хв",
      description: "Повний гігієнічний педикюр, скрабування, зволожуючий масаж та естетичне покриття.",
      popular: false,
      icon: "Sparkles"
    }
  ]
};

// ==============================================================================
// ГОТОВІ ПРЕСЕТИ ДЛЯ МИТТЄВОГО ПЕРЕМИКАННЯ (ДЕМОНСТРАЦІЯ WHITE-LABEL ЗА 1 КЛІК)
// ==============================================================================
export const businessPresets = {
  beautySalon: {
    ...businessConfig
  },

  barberShop: {
    businessName: "Blade & Barber",
    category: "Чоловічий барбершоп",
    tagline: "Класичні чоловічі стрижки, моделювання бороди та атмосфера справжнього клубу",
    rating: 4.98,
    reviewsCount: 230,
    logoUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=250&q=80",
    coverUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80",
    primaryColor: "#d97706", // Amber / Whiskey
    accentColor: "#334155",  // Slate
    currency: "грн",
    contact: {
      phone: "+380 50 111 22 33",
      address: "вул. Січових Стрільців, 14, Київ",
      workingHours: "Щодня: 10:00 - 22:00",
      instagram: "@blade_barber_club",
      telegramBot: "@BladeBarberBot",
      notificationChannel: "Шеф-Барбер Blade & Barber"
    },
    services: [
      {
        id: "b-1",
        name: "Чоловіча класична стрижка",
        category: "Стрижки",
        price: 500,
        duration: "40 хв",
        description: "Миття, індивідуальна стрижка ножицями та машинкою, укладання з преміум-помадою.",
        popular: true,
        icon: "Scissors"
      },
      {
        id: "b-2",
        name: "Моделювання бороди гарячим рушником",
        category: "Борода",
        price: 350,
        duration: "30 хв",
        description: "Чіткі контури, розпарювання гарячим рушником, стрижка та догляд оліями.",
        popular: true,
        icon: "Sparkles"
      },
      {
        id: "b-3",
        name: "Комплекс «Батько + Син»",
        category: "Комплекси",
        price: 800,
        duration: "60 хв",
        description: "Дві повноцінні стрижки одночасно для тата та сина з фірмовими напоями.",
        popular: false,
        icon: "Smile"
      },
      {
        id: "b-4",
        name: "Традиційне гоління небезпечною бритвою",
        category: "Борода",
        price: 450,
        duration: "35 хв",
        description: "Розпарювання ефірними оліями, тепла піна, ідеально гладке королівське гоління.",
        popular: false,
        icon: "Scissors"
      }
    ]
  },

  autoDetailing: {
    businessName: "Apex Auto Spa",
    category: "Детейлінг та автосервіс",
    tagline: "Професійний догляд, керамічний захист та відновлення блиску вашого автомобіля",
    rating: 4.91,
    reviewsCount: 98,
    logoUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=250&q=80",
    coverUrl: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
    primaryColor: "#0284c7", // Sky Blue
    accentColor: "#ef4444",  // Racing Red
    currency: "грн",
    contact: {
      phone: "+380 63 444 55 66",
      address: "Кільцева дорога, 12-А, Київ",
      workingHours: "Пн-Сб: 08:00 - 20:00",
      instagram: "@apex_autospa",
      telegramBot: "@ApexAutoBot",
      notificationChannel: "Менеджер боксів Apex"
    },
    services: [
      {
        id: "a-1",
        name: "Комплексна трьохфазна детейлінг-мийка",
        category: "Мийка",
        price: 800,
        duration: "50 хв",
        description: "Безконтактне очищення, ручний шампунь із пористою губкою, сушка турбо-феном та чорніння шин.",
        popular: true,
        icon: "Sparkles"
      },
      {
        id: "a-2",
        name: "Глибока хімчистка салону з озонуванням",
        category: "Салон",
        price: 2800,
        duration: "4-5 год",
        description: "Повне очищення килимового покриття, сидінь, стелі, повітропроводів та антибактеріальне озонування.",
        popular: true,
        icon: "Heart"
      },
      {
        id: "a-3",
        name: "Абразивне полірування кузова + Твердий віск",
        category: "Кузов",
        price: 4500,
        duration: "6 год",
        description: "Видалення 85% подряпин, голограм, відновлення глибини кольору та захисний карнаубський віск.",
        popular: false,
        icon: "Sparkles"
      }
    ]
  },

  coffeeRoastery: {
    businessName: "Kava Craft & Roasters",
    category: "Кав'ярня третьої хвилі",
    tagline: "Свіже обсмаження, авторські десерти та бронювання столиків / дегустацій",
    rating: 4.89,
    reviewsCount: 310,
    logoUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=250&q=80",
    coverUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
    primaryColor: "#92400e", // Warm Amber Brown
    accentColor: "#ea580c",  // Warm Orange
    currency: "грн",
    contact: {
      phone: "+380 93 333 77 88",
      address: "вул. Сагайдачного, 19, Київ (Поділ)",
      workingHours: "Пн-Нд: 08:00 - 21:00",
      instagram: "@kavacraft_kyiv",
      telegramBot: "@KavaCraftBot",
      notificationChannel: "Бариста-хостес Kava Craft"
    },
    services: [
      {
        id: "c-1",
        name: "Бронювання затишного столика (до 4 осіб)",
        category: "Столики",
        price: 250,
        duration: "2 год",
        description: "Депозит за столик, вітальний авторський напій та гарантоване місце біля панорамного вікна.",
        popular: true,
        icon: "Heart"
      },
      {
        id: "c-2",
        name: "Капінг (дегустація 5 сортів арабіки)",
        category: "Події",
        price: 450,
        duration: "60 хв",
        description: "Майстер-клас від сертифікованого Q-грейдера, оцінка дескрипторів та пачка зернової кави у подарунок.",
        popular: true,
        icon: "Sparkles"
      }
    ]
  }
};
