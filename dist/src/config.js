/**
 * ==============================================================================
 * BUSINESSKIT MVP — WHITE-LABEL CONFIG (TRILINGUAL: IT, EN, UK)
 * ==============================================================================
 */

export const businessConfig = {
  // 1. BUSINESS PROFILE (MULTILINGUAL)
  businessName: "Luxe Studio",
  category: {
    it: "Salone di Bellezza & SPA",
    en: "Beauty Salon & Luxury SPA",
    uk: "Салон краси & SPA"
  },
  tagline: {
    it: "Cura premium, stile su misura e relax totale per la tua bellezza e sicurezza",
    en: "Premium care, bespoke styling, and total relaxation for your confidence and beauty",
    uk: "Преміальний догляд, індивідуальний стиль та релакс для вашої впевненості"
  },
  rating: 4.95,
  reviewsCount: 142,

  // 2. BRANDING & MEDIA
  logoUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=250&q=80",
  coverUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",

  // 3. BRAND COLORS
  primaryColor: "#7c3aed",
  accentColor: "#db2777",
  
  currency: {
    it: "€",
    en: "€",
    uk: "грн"
  },

  // 4. CONTACTS (MULTILINGUAL)
  contact: {
    phone: "+39 02 8765 4321",
    address: {
      it: "Via Montenapoleone 18, Milano",
      en: "18 Montenapoleone St, Milan",
      uk: "вул. Хрещатик, 22, Київ"
    },
    workingHours: {
      it: "Lun-Dom: 09:00 - 20:00",
      en: "Mon-Sun: 09:00 - 20:00",
      uk: "Пн-Нд: 09:00 - 20:00"
    },
    instagram: "@luxe_studio_milano",
    telegramBot: "@LuxeStudioBot"
  },

  // 5. SERVICES CATALOG (TRILINGUAL IN EVERY FIELD)
  services: [
    {
      id: "srv-1",
      name: {
        it: "Taglio e Piega Stilistica",
        en: "Signature Haircut & Blowout",
        uk: "Стрижка та авторське укладання"
      },
      category: {
        it: "Capelli",
        en: "Hair",
        uk: "Волосся"
      },
      price: {
        it: 45,
        en: 45,
        uk: 650
      },
      duration: {
        it: "45 min",
        en: "45 min",
        uk: "45 хв"
      },
      description: {
        it: "Lavaggio relax con massaggio alla cute, consulenza forma del viso, taglio di precisione e piega con prodotti biologici.",
        en: "Relaxing scalp massage wash, face-shape consultation, precision styling cut, and blowout with organic products.",
        uk: "Миючий SPA-ритуал, підбір форми за типом обличчя, моделювання та фінішний стайлінг з преміум-засобами."
      },
      popular: true
    },
    {
      id: "srv-2",
      name: {
        it: "Manicure Spa Completa con Semipermanente",
        en: "Deluxe Spa Manicure with Gel Polish",
        uk: "Комплексний преміум-манікюр"
      },
      category: {
        it: "Unghie",
        en: "Nails",
        uk: "Нігті"
      },
      price: {
        it: 40,
        en: 40,
        uk: 750
      },
      duration: {
        it: "60 min",
        en: "60 min",
        uk: "60 хв"
      },
      description: {
        it: "Trattamento cuticole a secco combinato, peeling idratante, applicazione smalto semipermanente rinforzato di lunga durata.",
        en: "Combined Russian/dry cuticle care, hydrating peel, and application of long-lasting reinforced gel polish.",
        uk: "Апаратне або комбіноване очищення, доглядове масло, покриття стійким гель-лаком."
      },
      popular: true
    },
    {
      id: "srv-3",
      name: {
        it: "Trattamento Viso Anti-Age con Massaggio Linfodrenante",
        en: "Anti-Aging Facial with Lymphatic Massage",
        uk: "SPA-догляд та масаж обличчя"
      },
      category: {
        it: "Trattamenti",
        en: "Skincare",
        uk: "Догляд"
      },
      price: {
        it: 85,
        en: 85,
        uk: 1200
      },
      duration: {
        it: "60 min",
        en: "60 min",
        uk: "60 хв"
      },
      description: {
        it: "Detersione profonda, esfoliazione enzimatica, maschera rigenerante all'acido ialuronico e massaggio liftante.",
        en: "Deep gentle cleansing, enzyme exfoliation, hyaluronic regenerating mask, and lifting facial massage.",
        uk: "М'яка ексфоліація, лімфодренажний масаж, альгінатна відновлююча маска та активна сироватка."
      },
      popular: false
    },
    {
      id: "srv-4",
      name: {
        it: "Architettura e Laminazione Sopracciglia",
        en: "Brow Architecture & Keratin Lamination",
        uk: "Архітектура та ламінування брів"
      },
      category: {
        it: "Sopracciglia",
        en: "Brows",
        uk: "Брови"
      },
      price: {
        it: 35,
        en: 35,
        uk: 550
      },
      duration: {
        it: "40 min",
        en: "40 min",
        uk: "40 хв"
      },
      description: {
        it: "Studio geometrico dello sguardo, colorazione all'henné o tinta delicata, fissaggio e nutrimento alla cheratina.",
        en: "Geometric mapping, delicate tint or henna coloring, keratin nourishing nourishment and long-lasting shape fix.",
        uk: "Моделювання ідеальної форми, безпечне фарбування та фіксація кератиновим складом."
      },
      popular: false
    },
    {
      id: "srv-5",
      name: {
        it: "Trucco Professionale Giorno / Evento",
        en: "Professional Day & Evening Makeup",
        uk: "Денний / Коктейльний макіяж"
      },
      category: {
        it: "Make-up",
        en: "Makeup",
        uk: "Макіяж"
      },
      price: {
        it: 60,
        en: 60,
        uk: 900
      },
      duration: {
        it: "50 min",
        en: "50 min",
        uk: "50 хв"
      },
      description: {
        it: "Base viso ad altissima definizione e tenuta, risalto occhi o labbra, contouring leggero e fissativo professionale.",
        en: "High-definition long-wear complexion base, eye or lip emphasis, natural contouring and professional setting spray.",
        uk: "Ідеальний рівний тон, акцент на очі або губи, професійна фіксація на весь день."
      },
      popular: false
    },
    {
      id: "srv-6",
      name: {
        it: "Pedicure Estetica con Scrub e Massaggio",
        en: "Spa Aesthetic Pedicure with Scrub & Foot Massage",
        uk: "Педикюр з масажем стоп"
      },
      category: {
        it: "Unghie",
        en: "Nails",
        uk: "Нігті"
      },
      price: {
        it: 50,
        en: 50,
        uk: 850
      },
      duration: {
        it: "60 min",
        en: "60 min",
        uk: "60 хв"
      },
      description: {
        it: "Pedicure completa curativa ed estetica, levigatura, scrub ai sali marini, crema emolliente e massaggio rigenerante.",
        en: "Complete aesthetic pedicure, gentle filing, sea salt exfoliating scrub, rich softening balm, and foot massage.",
        uk: "Повний гігієнічний педикюр, скрабування, зволожуючий масаж та естетичне покриття."
      },
      popular: false
    }
  ]
};

// ==============================================================================
// BUSINESS PRESETS (ALL TRILINGUAL)
// ==============================================================================
export const businessPresets = {
  beautySalon: { ...businessConfig },

  barberShop: {
    businessName: "Blade & Barber",
    category: {
      it: "Barbershop Tradizionale Maschile",
      en: "Traditional Men's Barbershop",
      uk: "Чоловічий барбершоп"
    },
    tagline: {
      it: "Tagli classici maschili, cura della barba e atmosfera da vero club esclusivo",
      en: "Classic haircuts, beard sculpting, and authentic gentlemen's club atmosphere",
      uk: "Класичні чоловічі стрижки, моделювання бороди та атмосфера справжнього клубу"
    },
    rating: 4.98,
    reviewsCount: 230,
    logoUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=250&q=80",
    coverUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80",
    primaryColor: "#d97706",
    accentColor: "#334155",
    currency: { it: "€", en: "€", uk: "грн" },
    contact: {
      phone: "+39 06 1234 5678",
      address: {
        it: "Via del Corso 45, Roma",
        en: "45 Corso St, Rome",
        uk: "вул. Січових Стрільців, 14, Київ"
      },
      workingHours: {
        it: "Tutti i giorni: 10:00 - 21:00",
        en: "Everyday: 10:00 - 21:00",
        uk: "Щодня: 10:00 - 22:00"
      },
      instagram: "@blade_barber_roma",
      telegramBot: "@BladeBarberBot"
    },
    services: [
      {
        id: "b-1",
        name: {
          it: "Taglio Capelli Uomo Classico",
          en: "Classic Gentleman's Haircut",
          uk: "Чоловіча класична стрижка"
        },
        category: {
          it: "Capelli",
          en: "Hair",
          uk: "Стрижки"
        },
        price: { it: 30, en: 30, uk: 500 },
        duration: { it: "40 min", en: "40 min", uk: "40 хв" },
        description: {
          it: "Lavaggio tonificante, sfumatura a forbice e tosatrice, rifinitura contorni e cera modellante opaca.",
          en: "Invigorating wash, clipper and shear fade, neckline shave, and premium matte wax finish.",
          uk: "Миття, індивідуальна стрижка ножицями та машинкою, укладання з преміум-помадою."
        },
        popular: true
      },
      {
        id: "b-2",
        name: {
          it: "Modellatura Barba con Panno Caldo",
          en: "Beard Sculpting & Hot Towel Treatment",
          uk: "Моделювання бороди гарячим рушником"
        },
        category: {
          it: "Barba",
          en: "Beard",
          uk: "Борода"
        },
        price: { it: 22, en: 22, uk: 350 },
        duration: { it: "30 min", en: "30 min", uk: "30 хв" },
        description: {
          it: "Impacco con panno caldo aromatico, sfumatura barba a rasoio, contorni netti e olio nutriente.",
          en: "Aromatic hot towel steam, razor-sharp edge lines, scissor trim, and conditioning beard oil.",
          uk: "Чіткі контури, розпарювання гарячим рушником, стрижка та догляд оліями."
        },
        popular: true
      }
    ]
  },

  autoDetailing: {
    businessName: "Apex Auto Spa",
    category: {
      it: "Centro Detailing & Cura Auto",
      en: "Detailing & Auto Spa",
      uk: "Детейлінг та автосервіс"
    },
    tagline: {
      it: "Cura professionale, protezione ceramica nanotecnologica e ripristino brillantezza",
      en: "Professional car care, ceramic coating protection, and deep shine restoration",
      uk: "Професійний догляд, керамічний захист та відновлення блиску вашого автомобіля"
    },
    rating: 4.91,
    reviewsCount: 98,
    logoUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=250&q=80",
    coverUrl: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
    primaryColor: "#0284c7",
    accentColor: "#ef4444",
    currency: { it: "€", en: "€", uk: "грн" },
    contact: {
      phone: "+39 02 9988 7766",
      address: {
        it: "Viale Certosa 110, Milano",
        en: "110 Certosa Ave, Milan",
        uk: "Кільцева дорога, 12-А, Київ"
      },
      workingHours: {
        it: "Lun-Sab: 08:30 - 19:30",
        en: "Mon-Sat: 08:30 - 19:30",
        uk: "Пн-Сб: 08:00 - 20:00"
      },
      instagram: "@apex_autospa_milano",
      telegramBot: "@ApexAutoBot"
    },
    services: [
      {
        id: "a-1",
        name: {
          it: "Lavaggio Detailing a 3 Fasi con Asciugatura ad Aria",
          en: "3-Phase Detailing Hand Wash & Air Dry",
          uk: "Комплексна трьохфазна детейлінг-мийка"
        },
        category: {
          it: "Lavaggio",
          en: "Wash",
          uk: "Мийка"
        },
        price: { it: 55, en: 55, uk: 800 },
        duration: { it: "50 min", en: "50 min", uk: "50 хв" },
        description: {
          it: "Prelavaggio decontaminante, shampoo neutro a mano con guanto in lana, pulizia cerchi e nero gomme.",
          en: "Pre-wash foam decontamination, two-bucket hand wash, alloy wheel detail, and air blow dry.",
          uk: "Безконтактне очищення, ручний шампунь із пористою губкою, сушка турбо-феном та чорніння шин."
        },
        popular: true
      },
      {
        id: "a-2",
        name: {
          it: "Sanificazione e Pulizia Profonda Interni con Ozono",
          en: "Deep Interior Cleaning & Ozone Sanitation",
          uk: "Глибока хімчистка салону з озонуванням"
        },
        category: {
          it: "Interni",
          en: "Interior",
          uk: "Салон"
        },
        price: { it: 160, en: 160, uk: 2800 },
        duration: { it: "3-4 ore", en: "3-4 hours", uk: "4-5 год" },
        description: {
          it: "Smacchiatura a vapore di sedili, moquette e cielo, pulizia condotti aria e trattamento antibatterico all'ozono.",
          en: "Steam extraction of upholstery, carpets and headliner, leather treatment, and ozone air sanitization.",
          uk: "Повне очищення килимового покриття, сидінь, стелі, повітропроводів та антибактеріальне озонування."
        },
        popular: true
      }
    ]
  },

  coffeeRoastery: {
    businessName: "Kava Craft & Roasters",
    category: {
      it: "Caffetteria Specialty & Roastery",
      en: "Specialty Coffee Roasters & Bakery",
      uk: "Кав'ярня третьої хвилі"
    },
    tagline: {
      it: "Caffè specialty monorigine, tostatura artigianale e prenotazione tavoli & degustazioni",
      en: "Single-origin specialty coffees, artisan roast, and reservations for tables & tastings",
      uk: "Свіже обсмаження, авторські десерти та бронювання столиків / дегустацій"
    },
    rating: 4.89,
    reviewsCount: 310,
    logoUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=250&q=80",
    coverUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
    primaryColor: "#92400e",
    accentColor: "#ea580c",
    currency: { it: "€", en: "€", uk: "грн" },
    contact: {
      phone: "+39 02 3344 5566",
      address: {
        it: "Corso Garibaldi 72, Milano",
        en: "72 Garibaldi Ave, Milan",
        uk: "вул. Сагайдачного, 19, Київ"
      },
      workingHours: {
        it: "Lun-Dom: 08:00 - 20:30",
        en: "Mon-Sun: 08:00 - 20:30",
        uk: "Пн-Нд: 08:00 - 21:00"
      },
      instagram: "@kavacraft_milano",
      telegramBot: "@KavaCraftBot"
    },
    services: [
      {
        id: "c-1",
        name: {
          it: "Prenotazione Tavolo Relax (fino a 4 persone)",
          en: "Reserved Table Experience (up to 4 people)",
          uk: "Бронювання затишного столика (до 4 осіб)"
        },
        category: {
          it: "Tavoli",
          en: "Tables",
          uk: "Столики"
        },
        price: { it: 15, en: 15, uk: 250 },
        duration: { it: "2 ore", en: "2 hours", uk: "2 год" },
        description: {
          it: "Tavolo riservato con drink di benvenuto artigianale, connessione Wi-Fi veloce e posizione panoramica.",
          en: "Guaranteed cozy table with welcome specialty drink, fast Wi-Fi, and panoramic window view.",
          uk: "Депозит за столик, вітальний авторський напій та гарантоване місце біля панорамного вікна."
        },
        popular: true
      },
      {
        id: "c-2",
        name: {
          it: "Cupping Guidato: Degustazione 5 Caffè Monorigine",
          en: "Guided Cupping: 5 Single-Origin Tasting",
          uk: "Капінг (дегустація 5 сортів арабіки)"
        },
        category: {
          it: "Eventi",
          en: "Events",
          uk: "Події"
        },
        price: { it: 25, en: 25, uk: 450 },
        duration: { it: "60 min", en: "60 min", uk: "60 хв" },
        description: {
          it: "Masterclass con Q-Grader certificato, analisi delle note aromatiche e confezione da 250g in omaggio.",
          en: "Sensory tasting with certified Q-Grader, aromatic notes profiling, plus a 250g coffee bag gift.",
          uk: "Майстер-клас від сертифікованого Q-грейдера, оцінка дескрипторів та пачка зернової кави у подарунок."
        },
        popular: true
      }
    ]
  }
};

/**
 * Robust multilingual text/value extractor
 * Safely resolves { it, en, uk } objects or returns raw value
 */
export function getLocalized(val, lang = 'it') {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
    return val;
  }
  if (typeof val === 'object' && !Array.isArray(val)) {
    if (val[lang] !== undefined && val[lang] !== null && val[lang] !== '') return val[lang];
    if (val.it !== undefined && val.it !== null && val.it !== '') return val.it;
    if (val.en !== undefined && val.en !== null && val.en !== '') return val.en;
    if (val.uk !== undefined && val.uk !== null && val.uk !== '') return val.uk;
    const firstKey = Object.keys(val)[0];
    return firstKey ? val[firstKey] : '';
  }
  return String(val);
}

