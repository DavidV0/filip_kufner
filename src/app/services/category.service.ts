import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: 'weddings',
      title: 'Weddings',
      imageUrl: 'assets/images/bsp1.png',
      subCategories: [
        {
          id: 'wedding-2023',
          title: 'Wedding 2023',
          description: 'Beautiful moments from 2023 weddings',
          images: ['assets/images/bsp1.png', 'assets/images/bsp1.png']
        },
        {
          id: 'wedding-2022',
          title: 'Wedding 2022',
          description: 'Memorable wedding captures from 2022',
          images: ['assets/images/bsp1.png', 'assets/images/bsp1.png']
        }
      ]
    },
    {
      id: 'portraits',
      title: 'Portraits',
      imageUrl: 'assets/images/bsp1.png',
      subCategories: [
        {
          id: 'family-portraits',
          title: 'Family Portraits',
          description: 'Beautiful family moments',
          images: ['assets/images/bsp1.png', 'assets/images/bsp1.png']
        },
        {
          id: 'individual-portraits',
          title: 'Individual Portraits',
          description: 'Professional individual portraits',
          images: ['assets/images/bsp1.png', 'assets/images/bsp1.png']
        }
      ]
    },
    {
      id: 'events',
      title: 'Events',
      imageUrl: 'assets/images/bsp1.png',
      subCategories: [
        {
          id: 'corporate-events',
          title: 'Corporate Events',
          description: 'Professional business event photography',
          images: ['assets/images/bsp1.png', 'assets/images/bsp1.png']
        },
        {
          id: 'birthday-parties',
          title: 'Birthday Parties',
          description: 'Capturing special birthday moments',
          images: ['assets/images/bsp1.png', 'assets/images/bsp1.png']
        }
      ]
    },
    {
      id: 'nature',
      title: 'Nature',
      imageUrl: 'assets/images/bsp1.png',
      subCategories: [
        {
          id: 'landscapes',
          title: 'Landscapes',
          description: 'Breathtaking landscape photography',
          images: ['assets/images/bsp1.png', 'assets/images/bsp1.png']
        },
        {
          id: 'wildlife',
          title: 'Wildlife',
          description: 'Amazing wildlife captures',
          images: ['assets/images/bsp1.png', 'assets/images/bsp1.png']
        }
      ]
    }
];

  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(category => category.id === id);
  }
} 