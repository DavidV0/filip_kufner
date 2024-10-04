import { Component } from '@angular/core';
import { WorkCategoryComponent } from '../work-category/work-category.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-collection',
  standalone: true,
  imports: [WorkCategoryComponent, CommonModule],
  templateUrl: './work-collection.component.html',
  styleUrl: './work-collection.component.scss',
})
export class WorkCollectionComponent {
  categories = [
    { title: 'Weddings', imageUrl: 'assets/images/bsp1.png' },
    { title: 'Sport', imageUrl: 'assets/images/bsp1.png' },
    { title: 'Night life', imageUrl: 'assets/images/bsp1.png' },
    { title: 'Cars', imageUrl: 'assets/images/bsp1.png' },
    { title: 'Friends', imageUrl: 'assets/images/bsp1.png' },
  ];
}
