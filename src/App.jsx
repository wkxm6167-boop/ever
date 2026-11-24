import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import './App.css';

// Real maishiy texnika mahsulotlari bazasi
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Samsung Bespoke AI Inverter Sovutgich',
    brand: 'Samsung',
    category: 'Oshxona texnikasi',
    subCategory: 'Sovutgichlar',
    price: 14850000,
    oldPrice: 17200000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    isNew: true,
    isHit: true,
    warranty: '3 yil rasmiy kafolat (10 yil kompressorga)',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80',
    specs: {
      Hajmi: '385 Litr',
      Energiya: 'A+++ Digital Inverter',
      Tizim: 'No Frost / Twin Cooling Plus',
      Olchami: '203 x 59.5 x 65.8 sm',
      Rangi: 'Qora matoviy (Clean Black)'
    },
    description:
      "Zamonaviy sun'iy intellekt asosida energiya tejovchi Samsung Bespoke sovutgichi mahsulotlarni 2 barobar uzoqroq yangi saqlaydi."
  },
  {
    id: 2,
    name: 'LG AI DD Direct Drive Kir Yuvish Mashinasi 9kg',
    brand: 'LG',
    category: 'Tozalash va yuvish',
    subCategory: 'Kir yuvish mashinalari',
    price: 7490000,
    oldPrice: 8900000,
    discount: 16,
    rating: 4.8,
    reviewsCount: 218,
    inStock: true,
    isNew: false,
    isHit: true,
    warranty: '3 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    specs: {
      Yuklama: '9 kg',
      Aylanish: '1400 ayl/daq',
      Texnologiya: 'AI DD + Steam Bug‘ bilan yuvish',
      Shovqin: '52 dB (Juda jim)',
      Boshqaruv: 'Wi-Fi / LG ThinQ'
    },
    description:
      "Mato turini avtomatik aniqlab, optimal yuvish algoritmini tanlaydigan aqlli kir yuvish mashinasi. Allergenlardan 99.9% tozalaydi."
  },
  {
    id: 3,
    name: 'Sony Bravia XR 65" 4K OLED Smart TV',
    brand: 'Sony',
    category: 'Televizor va Audio',
    subCategory: 'Televizorlar',
    price: 23500000,
    oldPrice: 26800000,
    discount: 12,
    rating: 5.0,
    reviewsCount: 89,
    inStock: true,
    isNew: true,
    isHit: false,
    warranty: '2 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    specs: {
      Ekran: '65 dyuym (165 sm) OLED',
      Ruxsat: '3840x2160 (4K Ultra HD 120Hz)',
      Protsessor: 'Cognitive Processor XR',
      Tizim: 'Google TV / Dolby Vision Atmos',
      Portlar: '4x HDMI 2.1, 2x USB'
    },
    description:
      "Inson ko‘zi va qulog‘i idrokiga moslashtirilgan Cognitive Processor XR bilan kinozal darajasidagi chuqur qora rang va tiniq ovoz."
  },
  {
    id: 4,
    name: 'Dyson V15 Detect Absolute Simsiz Changyutgich',
    brand: 'Dyson',
    category: 'Tozalash va yuvish',
    subCategory: 'Changyutgichlar',
    price: 10900000,
    oldPrice: 12400000,
    discount: 12,
    rating: 4.9,
    reviewsCount: 176,
    inStock: true,
    isNew: false,
    isHit: true,
    warranty: '2 yil xalqaro kafolat',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    specs: {
      Quvvat: '240 AW so‘rish quvvati',
      Ishlash: '60 daqiqagacha avtonom',
      Filtratsiya: 'HEPA 99.99% (0.3 mikron)',
      Ekran: 'LCD real vaqt tahlili',
      Ogirligi: '3.1 kg'
    },
    description:
      "Yashil lazer nuri yordamida ko‘zga ko‘rinmas chang zarralarini ham aniqlaydigan eng kuchli va aqlli simsiz changyutgich."
  },
  {
    id: 5,
    name: 'Gree Amber Inverter Konditsioner 12 (35 m²)',
    brand: 'Gree',
    category: 'Iqlim texnikasi',
    subCategory: 'Konditsionerlar',
    price: 6850000,
    oldPrice: 7950000,
    discount: 14,
    rating: 4.7,
    reviewsCount: 310,
    inStock: true,
    isNew: false,
    isHit: true,
    warranty: '3 yil servis kafolati',
    image: 'https://images.unsplash.com/photo-1614631446501-abcf76949eca?auto=format&fit=crop&w=800&q=80',
    specs: {
      Maydon: '35-40 m² gacha',
      Kompressor: 'G10 Full DC Inverter',
      Harorat: '-25°C dan +54°C gacha',
      Freon: 'R32 ekologik toza',
      Shovqin: '19 dB tungi rejim'
    },
    description:
      "Past kuchlanishda (130V dan boshlab) ham barqaror ishlaydigan, qishda isitish va yozda tez sovutish uchun ideal inverter konditsioner."
  },
  {
    id: 6,
    name: 'DeLonghi Magnifica Evo Avtomatik Qahva Mashinasi',
    brand: 'DeLonghi',
    category: 'Oshxona texnikasi',
    subCategory: 'Qahva mashinalari',
    price: 8990000,
    oldPrice: 10500000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 94,
    inStock: true,
    isNew: true,
    isHit: false,
    warranty: '2 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    specs: {
      Bosim: '15 Bar',
      Kapuchinator: 'LatteCrema Avtomatik',
      Tegirmon: '13 bosqichli po‘lat tegirmon',
      Retseptlar: '7 xil ichimlik bir tugmada',
      Boshqaruv: 'Sensorli rangli panel'
    },
    description:
      "Har tong yangi maydalangan donlardan barista darajasidagi Espresso, Cappuccino va Latte Macchiato tayyorlab beradi."
  },
  {
    id: 7,
    name: 'Bosch Serie 6 O‘rnatiladigan Idish Yuvish Mashinasi',
    brand: 'Bosch',
    category: 'Oshxona texnikasi',
    subCategory: 'Idish yuvish mashinalari',
    price: 9200000,
    oldPrice: 10800000,
    discount: 15,
    rating: 4.8,
    reviewsCount: 67,
    inStock: true,
    isNew: false,
    isHit: false,
    warranty: '3 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&w=800&q=80',
    specs: {
      Sigimi: '14 komplekt idish',
      SuvSarfi: '9.5 Litr (1 sikl)',
      Dvigatel: 'EcoSilence Drive',
      Quritish: 'ExtraDry + EfficientDry',
      Shovqin: '42 dB'
    },
    description:
      "Nemis sifati va tejamkorligi. Eng yog‘li idishlarni ham yuqori haroratda ideal tozalaydi va avtomatik eshik ochib quritadi."
  },
  {
    id: 8,
    name: 'Roborock S8 MaxV Ultra Robot Changyutgich',
    brand: 'Roborock',
    category: 'Tozalash va yuvish',
    subCategory: 'Robot changyutgichlar',
    price: 13900000,
    oldPrice: 15600000,
    discount: 11,
    rating: 4.9,
    reviewsCount: 128,
    inStock: true,
    isNew: true,
    isHit: true,
    warranty: '1 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1589894404892-7310b92ea7a2?auto=format&fit=crop&w=800&q=80',
    specs: {
      Quvvat: '10 000 Pa HyperForce',
      Stansiya: '8-in-1 RockDock Ultra',
      Navigatsiya: 'LiDAR + Reactive AI 2.0',
      NamTozalash: 'VibraRise 3.0 issiq suv bilan',
      Batareya: '5200 mAh (180 daqiqa)'
    },
    description:
      "O‘zi changni bo‘shatadigan, lattaga 60°C issiq suv quyib yuvadigan va issiq havo bilan quritadigan to‘liq avtonom robot."
  },
  {
    id: 9,
    name: 'Samsung Q990D 11.1.4ch Dolby Atmos Soundbar',
    brand: 'Samsung',
    category: 'Televizor va Audio',
    subCategory: 'Audio tizimlar',
    price: 11800000,
    oldPrice: 13500000,
    discount: 13,
    rating: 4.9,
    reviewsCount: 54,
    inStock: true,
    isNew: true,
    isHit: false,
    warranty: '1 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    specs: {
      Kanallar: '11.1.4 haqiqiy atrof-muhit ovozi',
      Quvvat: '656 Vt umumiy quvvat',
      Ulanish: 'Simsiz Dolby Atmos, Wi-Fi, BT',
      Xususiyat: 'Q-Symphony + SpaceFit Sound Pro',
      Komplekt: 'Sabvufer + 2 ta orqa kolonka'
    },
    description:
      "Uyingizni haqiqiy IMAX kinozaliga aylantiruvchi 22 dinamikli flagman akustik tizim."
  },
  {
    id: 10,
    name: 'Dyson Purifier Hot+Cool Formaldehyde HP09',
    brand: 'Dyson',
    category: 'Iqlim texnikasi',
    subCategory: 'Havo tozalagichlar',
    price: 9650000,
    oldPrice: 11200000,
    discount: 14,
    rating: 4.8,
    reviewsCount: 73,
    inStock: false,
    isNew: false,
    isHit: false,
    warranty: '2 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    specs: {
      Funksiya: 'Tozalash + Isitish + Sovutish',
      Filtr: 'HEPA H13 + Katalitik filtr',
      Sensorlar: 'PM2.5, PM10, VOC, NO2, Formaldegid',
      Aylanish: '350° burchak ostida',
      Ilova: 'MyDyson Smart Control'
    },
    description:
      "Havodagi eng mayda viruslar, allergenlar va zararli gazlarni 99.95% ushlab qoluvchi uch funksiyali havo tozalagich."
  },
  {
    id: 11,
    name: 'Bosch Serie 8 O‘rnatiladigan Elektr Duxovka',
    brand: 'Bosch',
    category: 'Oshxona texnikasi',
    subCategory: 'Pechlar va plitalar',
    price: 10400000,
    oldPrice: 11900000,
    discount: 13,
    rating: 4.9,
    reviewsCount: 49,
    inStock: true,
    isNew: false,
    isHit: false,
    warranty: '3 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    specs: {
      Hajmi: '71 Litr',
      Rejimlar: '13 ta pishirish dasturi + 4D issiq havo',
      Tozalash: 'Pirolitik o‘z-o‘zini tozalash',
      Harorat: '30°C dan 300°C gacha',
      Ekran: 'TFT sensorli halqa'
    },
    description:
      "PerfectBake sensori va PerfectRoast termometri yordamida taomlarni oshpaz kabi mukammal pishiring."
  },
  {
    id: 12,
    name: 'LG PuriCare 360° Hit Havo Namlagich va Tozalagich',
    brand: 'LG',
    category: 'Iqlim texnikasi',
    subCategory: 'Havo tozalagichlar',
    price: 4450000,
    oldPrice: 5200000,
    discount: 14,
    rating: 4.7,
    reviewsCount: 112,
    inStock: true,
    isNew: true,
    isHit: false,
    warranty: '2 yil rasmiy kafolat',
    image: 'https://images.unsplash.com/photo-1632928274371-878938e4d825?auto=format&fit=crop&w=800&q=80',
    specs: {
      Maydon: '60 m² gacha',
      Filtr: 'Safe Plus + Deodorization',
      Shovqin: '25 dB',
      Indikator: '4 rangli havo sifati chirog‘i',
      Ogirligi: '6.75 kg'
    },
    description:
      "Xonaning har bir burchagiga 360 daraja toza va musaffo havo yetkazib beruvchi ixcham qurilma."
  }
];

const HERO_SLIDES = [
  {
    id: 1,
    badge: 'YANGI AVLOD TEXNOLOGIYALARI',
    title: 'Uyingiz uchun aqlli va tejamkor maishiy texnika',
    subtitle:
      "Ever do‘konida Samsung, LG, Dyson va Bosch brendlarining rasmiy kafolatli texnikalarini 24 oygacha muddatli to‘lovga xarid qiling.",
    ctaPrimary: 'Katalogni ko‘rish',
    ctaSecondary: 'Chegirmalar (-30% gacha)',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=80',
    stats: [
      { value: '15 000+', label: 'Mamnun mijozlar' },
      { value: '3 yilgacha', label: 'Rasmiy kafolat' },
      { value: '24 soat', label: 'Bepul yetkazish' }
    ]
  },
  {
    id: 2,
    badge: 'OSHXONA INQILOBI',
    title: 'Zamonaviy oshxona uchun premium yechimlar',
    subtitle:
      "AI Inverter sovutgichlar, avtomatik qahva mashinalari va o‘rnatiladigan texnikalar to‘plamiga maxsus chegirmalar.",
    ctaPrimary: 'Oshxona texnikasi',
    ctaSecondary: 'Maslahat olish',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1400&q=80',
    stats: [
      { value: '0% boshlang‘ich', label: 'Muddatli to‘lov' },
      { value: 'Bepul', label: 'O‘rnatib berish' },
      { value: '100% original', label: 'Sertifikatlangan' }
    ]
  },
  {
    id: 3,
    badge: 'MUKAMMAL IQLIM VA TOZALIK',
    title: 'Har mavsumda qulay harorat va ideal ozodalik',
    subtitle:
      "Dyson va Roborock aqlli changyutgichlari hamda inverter konditsionerlar bilan vaqtingizni o‘zingizga sarflang.",
    ctaPrimary: 'Tozalash texnikasi',
    ctaSecondary: 'Iqlim texnikasi',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    stats: [
      { value: 'A+++', label: 'Energiya samaradorlik' },
      { value: '12 viloyat', label: 'Bo‘ylab yetkazish' },
      { value: '24/7', label: 'Servis markazi' }
    ]
  }
];

const CATEGORIES = [
  { name: 'Barchasi', icon: '⚡', count: 12 },
  { name: 'Oshxona texnikasi', icon: '🍳', count: 4 },
  { name: 'Tozalash va yuvish', icon: '🧺', count: 3 },
  { name: 'Televizor va Audio', icon: '📺', count: 2 },
  { name: 'Iqlim texnikasi', icon: '❄️', count: 3 }
];

const BRANDS = ['Barchasi', 'Samsung', 'LG', 'Sony', 'Dyson', 'Bosch', 'Gree', 'DeLonghi', 'Roborock'];

const FAQ_DATA = [
  {
    question: 'Muddatli to‘lov (rassrochka) shartlari qanday?',
    answer:
      "Ever do‘konida barcha mahsulotlarni pasport va plastik karta orqali 3, 6, 12 yoki 24 oyga boshlang‘ich to‘lovsiz xarid qilishingiz mumkin. Rasmiylashtirish atigi 15 daqiqa vaqt oladi."
  },
  {
    question: 'Yetkazib berish va o‘rnatish xizmati bepulmi?',
    answer:
      "Toshkent shahri bo‘ylab 1 000 000 so‘mdan yuqori buyurtmalar 24 soat ichida mutlaqo bepul yetkazib beriladi. Kir yuvish mashinasi, sovutgich va televizorlarni mutaxassislarimiz bepul ulab berishadi."
  },
  {
    question: 'Mahsulotlarga necha yil kafolat beriladi?',
    answer:
      "Barcha texnikalar rasmiy distribyutorlardan keltirilgan bo‘lib, brendga qarab 1 yildan 3 yilgacha to‘liq servis kafolatiga, inverter motor va kompressorlar esa 10 yillik kafolatga ega."
  },
  {
    question: 'Agar texnikada nosozlik chiqsa nima bo‘ladi?',
    answer:
      "Xarid qilingan kundan boshlab 14 kun ichida zavod nuqsoni aniqlansa, mahsulot hech qanday to‘lovsiz yangisiga almashtirib beriladi."
  }
];

export default function App() {
  // Asosiy holatlar (States)
  const [products] = useState(INITIAL_PRODUCTS);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [selectedBrand, setSelectedBrand] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState(30000000);

  // Savatcha, Sevimlilar va Solishtirish
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ever_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ever_wishlist');
    return saved ? JSON.parse(saved) : [1, 4];
  });
  const [compareList, setCompareList] = useState([]);

  // Modallar va Drawerlar
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Qo'shimcha interaktiv holatlar
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [installmentMonths, setInstallmentMonths] = useState(12);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '+998 ',
    address: '',
    paymentType: 'card'
  });

  // Flesh-aksiya taymeri (soniyalarda)
  const [timeLeft, setTimeLeft] = useState(14 * 3600 + 38 * 60 + 45);

  // LocalStorage sinxronizatsiyasi
  useEffect(() => {
    localStorage.setItem('ever_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ever_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Hero slayder avtomatik almashinuvi
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(slideTimer);
  }, []);

  // Chegirma taymeri
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Toast bildirishnoma ko'rsatish
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Narxni chiroyli formatlash (masalan: 14 850 000 so'm)
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " so'm";
  };

  // Taymer vaqtini formatlash
  const formatTimer = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0')
    };
  };

  const timerObj = formatTimer(timeLeft);

  // Mahsulotlarni filtrlash va saralash
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'Barchasi' || item.category === selectedCategory;
        const matchesBrand = selectedBrand === 'Barchasi' || item.brand === selectedBrand;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStock = !onlyInStock || item.inStock;
        const matchesPrice = item.price <= maxPrice;
        return matchesCategory && matchesBrand && matchesSearch && matchesStock && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discount - a.discount;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy, onlyInStock, maxPrice]);

  // Savatcha funksiyalari
  const handleAddToCart = (product) => {
    if (!product.inStock) {
      showToast('Kechirasiz, ushbu mahsulot hozirda sotuvda mavjud emas', 'warning');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`"${product.name}" savatchaga qo'shildi!`);
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast("Mahsulot savatchadan o'chirildi", 'info');
  };

  // Sevimlilar funksiyasi
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast("Sevimlilar ro'yxatidan olib tashlandi", 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`"${product.name}" sevimlilarga saqlandi!`);
        return [...prev, product.id];
      }
    });
  };

  // Solishtirish funksiyasi
  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        showToast("Solishtirish ro'yxatidan olib tashlandi", 'info');
        return prev.filter((item) => item.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('Bir vaqtda maksimum 3 ta mahsulotni solishtirish mumkin', 'warning');
        return prev;
      }
      showToast(`"${product.name}" solishtirishga qo'shildi`);
      return [...prev, product];
    });
  };

  // Savatcha umumiy hisob-kitoblari
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartSavings = cart.reduce(
    (sum, item) => sum + ((item.oldPrice || item.price) - item.price) * item.quantity,
    0
  );

  // Buyurtmani rasmiylashtirish
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name.trim() || customerInfo.phone.trim().length < 9) {
      showToast('Iltimos, ismingiz va telefon raqamingizni to‘liq kiriting', 'warning');
      return;
    }
    setCart([]);
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
    setCustomerInfo({ name: '', phone: '+998 ', address: '', paymentType: 'card' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) {
      showToast("To'g'ri elektron pochta manzilini kiriting", 'warning');
      return;
    }
    showToast('Tabriklaymiz! 300 000 so‘mlik promokod pochtangizga yuborildi.');
    setNewsletterEmail('');
  };

  const scrollToCatalog = (category = 'Barchasi') => {
    setSelectedCategory(category);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentHero = HERO_SLIDES[activeSlide];
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="ever-app">
      {/* Toast bildirishnoma */}
      {toastMessage && (
        <div className={`ever-toast ever-toast--${toastMessage.type}`}>
          <span className="ever-toast__icon">
            {toastMessage.type === 'success' ? '✓' : toastMessage.type === 'warning' ? '!' : 'i'}
          </span>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Yuqori axborot paneli */}
      <div className="ever-topbar">
        <div className="ever-container ever-topbar__inner">
          <div className="ever-topbar__left">
            <span>📍 Toshkent va barcha viloyatlarga yetkazib berish</span>
            <span className="ever-divider">|</span>
            <span>🛡️ 100% Rasmiy kafolat</span>
          </div>
          <div className="ever-topbar__right">
            <a href="#faq-section">Muddatli to‘lov</a>
            <a href="#advantages-section">Servis markazlari</a>
            <a href="tel:+998712009900" className="ever-topbar__phone">
              📞 +998 (71) 200-99-00
            </a>
          </div>
        </div>
      </div>

      {/* Asosiy Header / Navbar */}
      <header className="ever-header">
        <div className="ever-container ever-header__inner">
          <a href="#top" className="ever-logo" onClick={() => setSelectedCategory('Barchasi')}>
            <div className="ever-logo__mark">E</div>
            <div className="ever-logo__text">
              <span className="ever-logo__brand">EVER</span>
              <span className="ever-logo__tagline">HOME APPLIANCES</span>
            </div>
          </a>

          <button
            className="ever-catalog-btn"
            onClick={() => scrollToCatalog('Barchasi')}
            aria-label="Katalog"
          >
            <span className="ever-burger-icon">☰</span>
            <span>Katalog</span>
          </button>

          <div className="ever-search">
            <input
              type="text"
              placeholder="Sovutgich, Dyson, TV yoki brend qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="ever-search__clear"
                onClick={() => setSearchQuery('')}
                title="Tozalash"
              >
                ✕
              </button>
            )}
            <button className="ever-search__btn" onClick={() => scrollToCatalog(selectedCategory)}>
              Qidirish
            </button>
          </div>

          <div className="ever-header__actions">
            <button
              className="ever-action-btn"
              onClick={() => setIsCompareOpen(true)}
              title="Solishtirish"
            >
              <span className="ever-action-btn__icon">⚖️</span>
              <span className="ever-action-btn__label">Solishtirish</span>
              {compareList.length > 0 && (
                <span className="ever-badge">{compareList.length}</span>
              )}
            </button>

            <button
              className="ever-action-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Sevimlilar"
            >
              <span className="ever-action-btn__icon">♡</span>
              <span className="ever-action-btn__label">Sevimlilar</span>
              {wishlist.length > 0 && <span className="ever-badge">{wishlist.length}</span>}
            </button>

            <button
              className="ever-action-btn ever-action-btn--cart"
              onClick={() => setIsCartOpen(true)}
              title="Savatcha"
            >
              <span className="ever-action-btn__icon">🛒</span>
              <span className="ever-action-btn__label">Savatcha</span>
              {cartTotalCount > 0 && (
                <span className="ever-badge ever-badge--accent">{cartTotalCount}</span>
              )}
            </button>

            <button
              className="ever-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobil menyu */}
        {mobileMenuOpen && (
          <div className="ever-mobile-nav">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className="ever-mobile-nav__item"
                onClick={() => {
                  scrollToCatalog(cat.name);
                  setMobileMenuOpen(false);
                }}
              >
                <span>
                  {cat.icon} {cat.name}
                </span>
                <span>→</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Slayder */}
      <section className="ever-hero" id="top">
        <div className="ever-container">
          <div className="ever-hero__card" key={currentHero.id}>
            <div className="ever-hero__content">
              <span className="ever-hero__badge">{currentHero.badge}</span>
              <h1 className="ever-hero__title">{currentHero.title}</h1>
              <p className="ever-hero__subtitle">{currentHero.subtitle}</p>

              <div className="ever-hero__buttons">
                <button
                  className="ever-btn ever-btn--primary"
                  onClick={() =>
                    scrollToCatalog(
                      currentHero.id === 2
                        ? 'Oshxona texnikasi'
                        : currentHero.id === 3
                        ? 'Tozalash va yuvish'
                        : 'Barchasi'
                    )
                  }
                >
                  {currentHero.ctaPrimary} →
                </button>
                <button
                  className="ever-btn ever-btn--glass"
                  onClick={() => {
                    setSortBy('discount');
                    scrollToCatalog('Barchasi');
                  }}
                >
                  {currentHero.ctaSecondary}
                </button>
              </div>

              <div className="ever-hero__stats">
                {currentHero.stats.map((st, idx) => (
                  <div key={idx} className="ever-hero__stat-item">
                    <strong>{st.value}</strong>
                    <span>{st.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ever-hero__visual">
              <div className="ever-hero__glow"></div>
              <img src={currentHero.image} alt={currentHero.title} className="ever-hero__img" />
              <div className="ever-hero__floating-card">
                <span className="ever-pulse-dot"></span>
                <div>
                  <strong>0% Boshlang‘ich to‘lov</strong>
                  <small>24 oygacha muddatli to‘lov</small>
                </div>
              </div>
            </div>

            {/* Slayder boshqaruv nuqtalari */}
            <div className="ever-hero__controls">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  className={`ever-hero__dot ${idx === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slayd ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kategoriyalar tezkor tanlovi */}
      <section className="ever-categories">
        <div className="ever-container">
          <div className="ever-categories__grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className={`ever-category-pill ${
                  selectedCategory === cat.name ? 'active' : ''
                }`}
                onClick={() => scrollToCatalog(cat.name)}
              >
                <span className="ever-category-pill__icon">{cat.icon}</span>
                <div className="ever-category-pill__info">
                  <strong>{cat.name}</strong>
                  <span>{cat.count} ta model</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Kun chegirmasi / Flash Sale Banner */}
      <section className="ever-flash">
        <div className="ever-container">
          <div className="ever-flash__box">
            <div className="ever-flash__info">
              <span className="ever-flash__tag">🔥 KUN TAKLIFI</span>
              <h2>Ever Mega Chegirmalar Haftaligi</h2>
              <p>
                Tanlangan premium maishiy texnikalarga 3 300 000 so‘mgacha tejamkorlik va bepul
                yetkazib berish!
              </p>
            </div>

            <div className="ever-flash__timer">
              <div className="ever-timer-block">
                <span>{timerObj.hours}</span>
                <small>Soat</small>
              </div>
              <span className="ever-timer-sep">:</span>
              <div className="ever-timer-block">
                <span>{timerObj.minutes}</span>
                <small>Daqiqa</small>
              </div>
              <span className="ever-timer-sep">:</span>
              <div className="ever-timer-block">
                <span>{timerObj.seconds}</span>
                <small>Soniya</small>
              </div>
            </div>

            <button
              className="ever-btn ever-btn--light"
              onClick={() => {
                setSortBy('discount');
                scrollToCatalog('Barchasi');
              }}
            >
              Barcha aksiyalar
            </button>
          </div>
        </div>
      </section>

      {/* Asosiy Mahsulotlar Katalogi */}
      <section className="ever-catalog" id="catalog-section">
        <div className="ever-container">
          <div className="ever-section-head">
            <div>
              <span className="ever-kicker">EVER KATALOG</span>
              <h2 className="ever-section-title">Ommabop maishiy texnikalar</h2>
            </div>
            <p className="ever-results-count">
              Topildi: <strong>{filteredProducts.length}</strong> ta mahsulot
            </p>
          </div>

          {/* Filtr va saralash paneli */}
          <div className="ever-filters">
            <div className="ever-brands-scroll">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  className={`ever-brand-chip ${selectedBrand === brand ? 'active' : ''}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>

            <div className="ever-filters__controls">
              <label className="ever-checkbox">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                />
                <span>Faqat sotuvda borlari</span>
              </label>

              <div className="ever-price-range">
                <span>Maks. narx: {formatPrice(maxPrice)}</span>
                <input
                  type="range"
                  min="4000000"
                  max="30000000"
                  step="500000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>

              <select
                className="ever-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Ommabopligi bo‘yicha</option>
                <option value="price-asc">Arzonroqdan qimmatroqqa</option>
                <option value="price-desc">Qimmatroqdan arzonroqqa</option>
                <option value="rating">Yuqori reyting</option>
                <option value="discount">Katta chegirmalar</option>
              </select>
            </div>
          </div>

          {/* Mahsulotlar Grid */}
          {filteredProducts.length > 0 ? (
            <div className="ever-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={toggleWishlist}
                  onToggleCompare={toggleCompare}
                  onQuickView={setQuickViewProduct}
                  isWishlisted={wishlist.includes(product.id)}
                  isCompared={compareList.some((item) => item.id === product.id)}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          ) : (
            <div className="ever-empty-state">
              <div className="ever-empty-state__icon">🔍</div>
              <h3>So‘rovingiz bo‘yicha mahsulot topilmadi</h3>
              <p>Filtrlarni o‘zgartirib ko‘ring yoki barcha mahsulotlarni tiklang.</p>
              <button
                className="ever-btn ever-btn--primary"
                onClick={() => {
                  setSelectedCategory('Barchasi');
                  setSelectedBrand('Barchasi');
                  setSearchQuery('');
                  setOnlyInStock(false);
                  setMaxPrice(30000000);
                }}
              >
                Filtrlarni tozalash
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Nega aynan Ever? Afzalliklar bo'limi */}
      <section className="ever-advantages" id="advantages-section">
        <div className="ever-container">
          <div className="ever-section-head ever-section-head--center">
            <span className="ever-kicker">BIZNING USTUNLIKLAR</span>
            <h2 className="ever-section-title">Nega mijozlar Ever’ni tanlashadi?</h2>
          </div>

          <div className="ever-advantages__grid">
            <div className="ever-adv-card">
              <div className="ever-adv-card__icon">🚚</div>
              <h3>Tezkor va bepul yetkazish</h3>
              <p>
                Toshkent bo‘ylab 24 soat ichida, O‘zbekistonning barcha viloyatlariga 2-3 ish
                kunida xavfsiz yetkazib beramiz.
              </p>
            </div>

            <div className="ever-adv-card">
              <div className="ever-adv-card__icon">💳</div>
              <h3>Halol muddatli to‘lov</h3>
              <p>
                Kafillarsiz, yashirin foizlarsiz va boshlang‘ich to‘lovsiz 24 oygacha qulay oylik
                to‘lovlar.
              </p>
            </div>

            <div className="ever-adv-card">
              <div className="ever-adv-card__icon">🛠️</div>
              <h3>Professional o‘rnatish</h3>
              <p>
                Sertifikatlangan muhandislarimiz texnikangizni o‘rnatib, ishlatish qoidalarini
                batafsil tushuntirib berishadi.
              </p>
            </div>

            <div className="ever-adv-card">
              <div className="ever-adv-card__icon">🛡️</div>
              <h3>3 yilgacha rasmiy kafolat</h3>
              <p>
                Barcha mahsulotlar original bo‘lib, rasmiy servis markazlari tomonidan to‘liq
                kafolatlanadi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Muddatli to'lov kalkulyatori */}
      <section className="ever-calculator">
        <div className="ever-container">
          <div className="ever-calc-box">
            <div className="ever-calc-box__left">
              <span className="ever-kicker">AQLLI REJALASHTIRISH</span>
              <h2>Muddatli to‘lovni oldindan hisoblang</h2>
              <p>
                O‘zingizga ma’qul muddatni tanlang va oylik to‘lov miqdorini darhol bilib oling.
              </p>

              <div className="ever-calc-months">
                {[3, 6, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    className={`ever-month-btn ${installmentMonths === m ? 'active' : ''}`}
                    onClick={() => setInstallmentMonths(m)}
                  >
                    {m} oy
                  </button>
                ))}
              </div>
            </div>

            <div className="ever-calc-box__right">
              <div className="ever-calc-preview">
                <small>Namuna: Samsung Bespoke AI Sovutgich</small>
                <div className="ever-calc-preview__price">
                  {formatPrice(Math.round(14850000 / installmentMonths))}{' '}
                  <span>/ oyiga</span>
                </div>
                <div className="ever-calc-preview__meta">
                  <span>Boshlang‘ich to‘lov: 0 so‘m</span>
                  <span>Muddat: {installmentMonths} oy</span>
                </div>
                <button
                  className="ever-btn ever-btn--primary"
                  onClick={() => handleAddToCart(products[0])}
                >
                  Hozir rasmiylashtirish
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Bo'limi */}
      <section className="ever-faq" id="faq-section">
        <div className="ever-container">
          <div className="ever-section-head ever-section-head--center">
            <span className="ever-kicker">KO‘P BERILADIGAN SAVOLLAR</span>
            <h2 className="ever-section-title">Sizni qiziqtirgan savollarga javoblar</h2>
          </div>

          <div className="ever-faq__list">
            {FAQ_DATA.map((item, idx) => (
              <div
                key={idx}
                className={`ever-faq-item ${openFaqIndex === idx ? 'open' : ''}`}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
              >
                <div className="ever-faq-item__q">
                  <h3>{item.question}</h3>
                  <span className="ever-faq-item__toggle">
                    {openFaqIndex === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaqIndex === idx && <p className="ever-faq-item__a">{item.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Obuna bo'limi */}
      <section className="ever-newsletter">
        <div className="ever-container">
          <div className="ever-newsletter__card">
            <div>
              <h2>Birinchi xaridingiz uchun 300 000 so‘m vaucher oling!</h2>
              <p>Yangi kelgan texnikalar va yopiq chegirmalar haqida birinchi bo‘lib xabardor bo‘ling.</p>
            </div>
            <form className="ever-newsletter__form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Elektron pochtangizni kiriting..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="ever-btn ever-btn--primary">
                Vaucherni olish
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ever-footer">
        <div className="ever-container">
          <div className="ever-footer__grid">
            <div className="ever-footer__col">
              <div className="ever-logo ever-logo--light">
                <div className="ever-logo__mark">E</div>
                <div className="ever-logo__text">
                  <span className="ever-logo__brand">EVER</span>
                  <span className="ever-logo__tagline">HOME APPLIANCES</span>
                </div>
              </div>
              <p className="ever-footer__desc">
                Ever — O‘zbekistondagi zamonaviy va ishonchli maishiy texnika do‘konlari tarmog‘i.
                Uyingiz qulayligi uchun eng yaxshi texnologiyalarni taqdim etamiz.
              </p>
              <div className="ever-socials">
                <a href="#telegram" onClick={(e) => e.preventDefault()}>
                  Telegram
                </a>
                <a href="#instagram" onClick={(e) => e.preventDefault()}>
                  Instagram
                </a>
                <a href="#youtube" onClick={(e) => e.preventDefault()}>
                  YouTube
                </a>
              </div>
            </div>

            <div className="ever-footer__col">
              <h4>Kategoriyalar</h4>
              <ul>
                {CATEGORIES.slice(1).map((cat) => (
                  <li key={cat.name}>
                    <button onClick={() => scrollToCatalog(cat.name)}>{cat.name}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ever-footer__col">
              <h4>Mijozlar uchun</h4>
              <ul>
                <li>
                  <a href="#faq-section">Muddatli to‘lov shartlari</a>
                </li>
                <li>
                  <a href="#advantages-section">Yetkazib berish va o‘rnatish</a>
                </li>
                <li>
                  <a href="#advantages-section">Kafolat va servis xizmati</a>
                </li>
                <li>
                  <a href="#catalog-section">Aksiyalar va chegirmalar</a>
                </li>
              </ul>
            </div>

            <div className="ever-footer__col">
              <h4>Aloqa markazi</h4>
              <p className="ever-footer__phone">+998 (71) 200-99-00</p>
              <p>Har kuni: 09:00 dan 22:00 gacha</p>
              <p>Manzil: Toshkent sh., Amir Temur shoh ko‘chasi, 108-uy</p>
              <div className="ever-payments">
                <span>UZCARD</span>
                <span>HUMO</span>
                <span>VISA</span>
                <span>PAYME</span>
                <span>CLICK</span>
              </div>
            </div>
          </div>

          <div className="ever-footer__bottom">
            <p>© {new Date().getFullYear()} EVER Home Appliances. Barcha huquqlar himoyalangan.</p>
            <p>Real tijoriy loyiha uchun ishlab chiqilgan.</p>
          </div>
        </div>
      </footer>

      {/* ================= MODALLAR VA DRAWERLAR ================= */}

      {/* 1. Savatcha (Cart Drawer) */}
      {isCartOpen && (
        <div className="ever-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="ever-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ever-drawer__head">
              <h3>Savatcha ({cartTotalCount})</h3>
              <button className="ever-close-btn" onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="ever-drawer__empty">
                <span>🛒</span>
                <h4>Savatchangiz hozircha bo‘sh</h4>
                <p>Katalogdan o‘zingizga yoqqan texnikani tanlang</p>
                <button
                  className="ever-btn ever-btn--primary"
                  onClick={() => {
                    setIsCartOpen(false);
                    scrollToCatalog('Barchasi');
                  }}
                >
                  Xaridni boshlash
                </button>
              </div>
            ) : (
              <>
                <div className="ever-drawer__body">
                  {cart.map((item) => (
                    <div key={item.id} className="ever-cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="ever-cart-item__info">
                        <h4>{item.name}</h4>
                        <span className="ever-cart-item__price">{formatPrice(item.price)}</span>
                        <div className="ever-qty-control">
                          <button onClick={() => updateCartQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <button
                        className="ever-remove-item"
                        onClick={() => removeFromCart(item.id)}
                        title="O'chirish"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}

                  {/* Tezkor buyurtma formasi */}
                  <form className="ever-checkout-form" onSubmit={handleCheckoutSubmit}>
                    <h4>Buyurtma ma’lumotlari</h4>
                    <input
                      type="text"
                      placeholder="Ismingiz"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, name: e.target.value })
                      }
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Telefon raqamingiz (+998...)"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Yetkazib berish manzili (ixtiyoriy)"
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, address: e.target.value })
                      }
                    />
                    <select
                      value={customerInfo.paymentType}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, paymentType: e.target.value })
                      }
                    >
                      <option value="card">Karta orqali (Payme / Click / Uzum)</option>
                      <option value="cash">Naqd pul (yetkazib berilganda)</option>
                      <option value="installment">Muddatli to‘lov (12 oyga 0%)</option>
                    </select>

                    <div className="ever-cart-summary">
                      {cartSavings > 0 && (
                        <div className="ever-summary-row ever-summary-row--save">
                          <span>Sizning tejamkorligingiz:</span>
                          <span>−{formatPrice(cartSavings)}</span>
                        </div>
                      )}
                      <div className="ever-summary-row">
                        <span>Yetkazib berish:</span>
                        <span>Bepul</span>
                      </div>
                      <div className="ever-summary-row ever-summary-row--total">
                        <span>Jami to‘lov:</span>
                        <span>{formatPrice(cartSubtotal)}</span>
                      </div>
                    </div>

                    <button type="submit" className="ever-btn ever-btn--primary ever-btn--full">
                      Buyurtmani tasdiqlash
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 2. Sevimlilar (Wishlist Drawer) */}
      {isWishlistOpen && (
        <div className="ever-overlay" onClick={() => setIsWishlistOpen(false)}>
          <div className="ever-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ever-drawer__head">
              <h3>Sevimlilar ({wishlistProducts.length})</h3>
              <button className="ever-close-btn" onClick={() => setIsWishlistOpen(false)}>
                ✕
              </button>
            </div>
            <div className="ever-drawer__body">
              {wishlistProducts.length === 0 ? (
                <div className="ever-drawer__empty">
                  <span>♡</span>
                  <h4>Sevimlilar ro‘yxati bo‘sh</h4>
                  <p>Yoqtirgan texnikalaringizni yurakcha belgisini bosib saqlang.</p>
                </div>
              ) : (
                wishlistProducts.map((item) => (
                  <div key={item.id} className="ever-cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="ever-cart-item__info">
                      <h4>{item.name}</h4>
                      <span className="ever-cart-item__price">{formatPrice(item.price)}</span>
                      <button
                        className="ever-btn ever-btn--small"
                        onClick={() => handleAddToCart(item)}
                      >
                        Savatchaga qo‘shish
                      </button>
                    </div>
                    <button
                      className="ever-remove-item"
                      onClick={() => toggleWishlist(item)}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Tezkor ko'rish (Quick View Modal) */}
      {quickViewProduct && (
        <div className="ever-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="ever-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="ever-close-btn ever-modal__close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>

            <div className="ever-quickview">
              <div className="ever-quickview__media">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
                {quickViewProduct.discount > 0 && (
                  <span className="ever-qv-discount">−{quickViewProduct.discount}%</span>
                )}
              </div>

              <div className="ever-quickview__details">
                <span className="ever-qv-brand">
                  {quickViewProduct.brand} • {quickViewProduct.subCategory}
                </span>
                <h2>{quickViewProduct.name}</h2>

                <div className="ever-qv-rating">
                  <span>⭐ {quickViewProduct.rating}</span>
                  <span>({quickViewProduct.reviewsCount} ta sharh)</span>
                  <span className="ever-qv-warranty">🛡️ {quickViewProduct.warranty}</span>
                </div>

                <p className="ever-qv-desc">{quickViewProduct.description}</p>

                <div className="ever-qv-specs">
                  <h4>Asosiy texnik xususiyatlari:</h4>
                  <ul>
                    {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                      <li key={key}>
                        <span>{key}:</span>
                        <strong>{val}</strong>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ever-qv-pricing">
                  <div>
                    {quickViewProduct.oldPrice && (
                      <span className="ever-qv-old">
                        {formatPrice(quickViewProduct.oldPrice)}
                      </span>
                    )}
                    <div className="ever-qv-current">{formatPrice(quickViewProduct.price)}</div>
                    <small className="ever-qv-installment">
                      Muddatli to‘lov:{' '}
                      <strong>{formatPrice(Math.round(quickViewProduct.price / 12))}</strong> /
                      oyiga
                    </small>
                  </div>

                  <div className="ever-qv-actions">
                    <button
                      className="ever-btn ever-btn--primary"
                      onClick={() => {
                        handleAddToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                    >
                      Savatchaga qo‘shish
                    </button>
                    <button
                      className={`ever-icon-outline ${
                        wishlist.includes(quickViewProduct.id) ? 'active' : ''
                      }`}
                      onClick={() => toggleWishlist(quickViewProduct)}
                    >
                      {wishlist.includes(quickViewProduct.id) ? '♥' : '♡'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Solishtirish (Compare Modal) */}
      {isCompareOpen && (
        <div className="ever-overlay" onClick={() => setIsCompareOpen(false)}>
          <div className="ever-modal ever-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="ever-drawer__head">
              <h3>Mahsulotlarni solishtirish ({compareList.length}/3)</h3>
              <button className="ever-close-btn" onClick={() => setIsCompareOpen(false)}>
                ✕
              </button>
            </div>

            {compareList.length === 0 ? (
              <div className="ever-drawer__empty">
                <span>⚖️</span>
                <h4>Solishtirish uchun mahsulot tanlanmagan</h4>
                <p>Mahsulot kartasidagi tarozi (⚖️) belgisini bosib 3 tagacha texnikani solishtiring.</p>
              </div>
            ) : (
              <div className="ever-compare-table-wrap">
                <table className="ever-compare-table">
                  <thead>
                    <tr>
                      <th>Parametrlar</th>
                      {compareList.map((item) => (
                        <th key={item.id}>
                          <div className="ever-compare-col">
                            <img src={item.image} alt={item.name} />
                            <h4>{item.name}</h4>
                            <span className="ever-compare-price">{formatPrice(item.price)}</span>
                            <div className="ever-compare-btns">
                              <button
                                className="ever-btn ever-btn--small"
                                onClick={() => handleAddToCart(item)}
                              >
                                Savatchaga
                              </button>
                              <button
                                className="ever-remove-text"
                                onClick={() => toggleCompare(item)}
                              >
                                O‘chirish
                              </button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Brend</td>
                      {compareList.map((item) => (
                        <td key={item.id}>
                          <strong>{item.brand}</strong>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Reyting</td>
                      {compareList.map((item) => (
                        <td key={item.id}>
                          ⭐ {item.rating} ({item.reviewsCount})
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Kafolat</td>
                      {compareList.map((item) => (
                        <td key={item.id}>{item.warranty}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Asosiy xususiyatlar</td>
                      {compareList.map((item) => (
                        <td key={item.id}>
                          <ul className="ever-compare-specs">
                            {Object.entries(item.specs).map(([k, v]) => (
                              <li key={k}>
                                <span>{k}:</span> {v}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Buyurtma tasdiqlanganligi modali */}
      {isCheckoutSuccess && (
        <div className="ever-overlay" onClick={() => setIsCheckoutSuccess(false)}>
          <div className="ever-modal ever-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="ever-success-box">
              <div className="ever-success-check">✓</div>
              <h2>Buyurtmangiz qabul qilindi!</h2>
              <p>
                Operatorlarimiz 5 daqiqa ichida siz bilan bog‘lanib, yetkazib berish vaqtini
                tasdiqlashadi. Ever’ni tanlaganingiz uchun rahmat!
              </p>
              <button
                className="ever-btn ever-btn--primary"
                onClick={() => setIsCheckoutSuccess(false)}
              >
                Ajoyib!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}