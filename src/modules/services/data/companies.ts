import type { Company } from '@/common/types/services'

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
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762695733/telegram_super_app/comp1-1_kinooh.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762695733/telegram_super_app/comp1-5_v2opbe.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762695733/telegram_super_app/comp1-2_ogcqqc.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762695733/telegram_super_app/comp1-3_anz6iv.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762695733/telegram_super_app/comp1-4_qfsmim.jpg',
    ],
    description: 'Мужские и классические стрижки. Барбершоп премиум-класса.',
    info: 'Супер стрижки на любой вкус',
    address: 'Улица Кубика-Рубика, д. 69',
    phone: ['+7 (999) 111-22-33'],
    email: 'contact@barbershop.ru',
    website: 'https://barbershop.ru',
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
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696067/telegram_super_app/comp2-1_eadbbr.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696066/telegram_super_app/comp2-2_meucsl.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696067/telegram_super_app/comp2-3_zbcj5i.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696067/telegram_super_app/comp2-4_lz6rbs.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696067/telegram_super_app/comp2-5_e3wrch.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696067/telegram_super_app/comp2-6_bsxb8y.jpg',
    ],
    address: 'Улица Телеграмная, д. 12',
    phone: ['+7 (495) 123-45-67', '+7 (925) 222-33-44'],
    email: 'service@oldboy.ru',
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
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696193/telegram_super_app/comp3-1_ehrbxx.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696193/telegram_super_app/comp3-2_aenxum.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696193/telegram_super_app/comp3-3_nmkhxp.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696193/telegram_super_app/comp3-4_itnfle.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696194/telegram_super_app/comp3-5_jdd3hu.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696193/telegram_super_app/comp3-6_expcuh.jpg',
    ],
    address: 'Улица Муркина, д. 19',
    phone: ['+7 (999) 777-88-99'],
    email: 'hello@beautystudio.ru',
    website: 'https://beautystudio.ru',
    socials: [{ name: 'vk', url: 'https://vk.com/beautystudio' }],
    coords: { lat: 55.753215, lng: 37.622504 },
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
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696285/telegram_super_app/com4-1_dm0dzl.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696285/telegram_super_app/comp4-2_s0ov5h.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696286/telegram_super_app/comp4-3_rmrj5i.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696286/telegram_super_app/comp4-4_bl78fl.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696288/telegram_super_app/comp4-5_qdaq8i.jpg',
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1762696288/telegram_super_app/comp4-6_bvnxut.jpg',
    ],
    address: 'Улица Эдуарда Сурового, д. 9999',
    phone: ['+7 (900) 555-00-11'],
    email: 'princess@beauty.ru',
    socials: [{ name: 'vk', url: 'https://vk.com/beautyprincess' }],
    coords: { lat: 55.748772, lng: 37.627095 },
    workHours: [
      { day: 'Пн–Пт', from: '10:00', to: '20:00' },
      { day: 'Сб', from: '11:00', to: '18:00' },
    ],
  },
]
