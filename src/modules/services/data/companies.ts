import { Company } from '@/common/types/services'

// Пример моков
export const companies: Company[] = [
  // Для категории "Стрижка"
  {
    id: 'comp-1',
    categoryId: 'cat-hair',
    title: 'BarberShop',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/barbershop-copm2_xhelhu.webp',
    info: 'Супер стрижки на любой вкус',
    address: 'Улица Кубика-Рубика, д. 69',
  },
  {
    id: 'comp-2',
    categoryId: 'cat-hair',
    title: 'OldBoy Barbershop',
    info: 'Мы сделаем из тебя красавчика',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/barbershop-copm1_sz6wpz.webp',
    address: 'Улица Телеграмная, д. 12',
  },

  // Для категории "Салон красоты"
  {
    id: 'comp-3',
    categoryId: 'cat-beauty',
    title: 'BeautyStudio',
    info: 'Твоя голова больше не будет жирной',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/beauty-comp1_bchqjp.webp',
    address: 'Улица Муркина, д. 19',
  },
  {
    id: 'comp-4',
    categoryId: 'cat-beauty',
    title: 'Beauty Princess',
    info: 'Теперь страшной ты будешь только не накрашенной',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/beauty-comp2_liibyf.webp',
    address: 'Улица Эдурарда Сурового, д. 9999',
  },
]
