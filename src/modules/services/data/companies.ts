import type { Company } from '@/common/types/сompany'

export const companies: Company[] = [
  // ---------- Категория: Стрижка ----------
  {
    id: 'comp-1',
    categoryId: 'cat-hair',
    title: 'BarberShop',
    slug: 'barbershop',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/barbershop-copm2_xhelhu.webp',
    gallery: [
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809391/telegram_super_app/comp1-1_mslkoc.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809391/telegram_super_app/comp1-2_fbltb3.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809391/telegram_super_app/comp1-3_pz7zdu.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809391/telegram_super_app/comp1-4_za2yef.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809391/telegram_super_app/comp1-5_epvt13.webp',
    ],
    description: 'Мужские и классические стрижки. Барбершоп премиум-класса.',
    info: 'Супер стрижки на любой вкус',
    address: 'Улица Кубика-Рубика, д. 69',
    phone: ['+7 (999) 111-22-33'],
    email: 'contact@barbershop.com',
    website: 'https://barbershop.com',
    socials: [
      { name: 'telegram', url: 'https://telegram.org/barbershop' },
      { name: 'vk', url: 'https://vk.com/barbershop' },
    ],
    coords: { lat: 55.751244, lng: 37.618423 },
    workHours: [
      { day: 'Пн–Пт', from: '10:00', to: '21:00' },
      { day: 'Сб', from: '10:00', to: '20:00' },
      { day: 'Вс', from: '11:00', to: '19:00' },
    ],
    nearby: [
      {
        id: 'comp-2',
        name: 'OldBoy Barbershop',
        address: 'Улица Телеграмная, д. 12',
        phone: ['+7 (495) 123-45-67', '+7 (925) 222-33-44'],
        coords: { lat: 55.760241, lng: 37.620393 },
        distance: 780,
      },
      {
        id: 'comp-3',
        name: 'BeautyStudio',
        address: 'Улица Муркина, д. 19',
        phone: ['+7 (999) 777-88-99'],
        coords: { lat: 55.748102, lng: 37.6208 },
        distance: 420,
      },
      {
        id: 'comp-4',
        name: 'Beauty Princess',
        address: 'Улица Эдуарда Сурового, д. 9999',
        phone: ['+7 (900) 555-00-11'],
        coords: { lat: 55.748772, lng: 37.627095 },
        distance: 550,
      },
    ],
  },

  {
    id: 'comp-2',
    categoryId: 'cat-hair',
    title: 'OldBoy Barbershop',
    slug: 'oldboy',
    info: 'Мы сделаем из тебя красавчика',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/barbershop-copm1_sz6wpz.webp',
    gallery: [
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809550/telegram_super_app/comp2-1_jhg2x5.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809550/telegram_super_app/comp2-2_h1fpjk.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809550/telegram_super_app/comp2-3_ubn7ax.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809550/telegram_super_app/comp2-4_dljonx.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809550/telegram_super_app/comp2-5_kyl1ct.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809551/telegram_super_app/comp2-6_dk1nho.webp',
    ],
    address: 'Улица Телеграмная, д. 12',
    phone: ['+7 (495) 123-45-67', '+7 (925) 222-33-44'],
    email: 'service@oldboy.com',
    socials: [
      { name: 'telegram', url: 'https://telegram.org/oldboy' },
      { name: 'vk', url: 'https://vk.com/oldboy' },
    ],
    coords: { lat: 55.760241, lng: 37.620393 },
    workHours: [{ day: 'Пн–Вс', from: '09:00', to: '22:00' }],
  },

  // ---------- Категория: Салон красоты ----------
  {
    id: 'comp-3',
    categoryId: 'cat-beauty',
    title: 'BeautyStudio',
    slug: 'beauty-studio',
    info: 'Твоя голова больше не будет жирной',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/beauty-comp1_bchqjp.webp',
    gallery: [
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809713/telegram_super_app/comp3-1_czbxj6.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809713/telegram_super_app/comp3-2_woe31e.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809713/telegram_super_app/comp3-3_uhdhpb.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809713/telegram_super_app/comp3-4_tjyyn9.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809714/telegram_super_app/comp3-5_ntzugq.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809714/telegram_super_app/comp3-6_incxlp.webp',
    ],
    address: 'Улица Муркина, д. 19',
    phone: ['+7 (999) 777-88-99'],
    email: 'hello@beautystudio.com',
    website: 'https://beautystudio.com',
    socials: [{ name: 'vk', url: 'https://vk.com/beautystudio' }],
    coords: { lat: 55.748102, lng: 37.6208 },
    workHours: [
      { day: 'Пн–Пт', from: '09:00', to: '20:00' },
      { day: 'Сб–Вс', from: '10:00', to: '19:00' },
    ],
  },

  {
    id: 'comp-4',
    categoryId: 'cat-beauty',
    title: 'Beauty Princess',
    slug: 'beauty-princess',
    info: 'Теперь страшной ты будешь только не накрашенной',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/beauty-comp2_liibyf.webp',
    gallery: [
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809805/telegram_super_app/com4-1_fqbuko.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809805/telegram_super_app/comp4-2_cs2xe7.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809805/telegram_super_app/comp4-3_buxlwq.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809806/telegram_super_app/comp4-4_s3jejm.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809806/telegram_super_app/comp4-5_bldvuq.webp',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1763809807/telegram_super_app/comp4-6_f23z9i.webp',
    ],
    address: 'Улица Эдуарда Сурового, д. 9999',
    phone: ['+7 (900) 555-00-11'],
    email: 'princess@beauty.com',
    socials: [{ name: 'vk', url: 'https://vk.com/beautyprincess' }],
    coords: { lat: 55.748772, lng: 37.627095 },
    workHours: [
      { day: 'Пн–Пт', from: '10:00', to: '20:00' },
      { day: 'Сб', from: '11:00', to: '18:00' },
    ],
  },
]
