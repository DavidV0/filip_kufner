import { Component } from '@angular/core';
import { WorkCategoryComponent } from '../work-category/work-category.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-work-collection',
  standalone: true,
  imports: [WorkCategoryComponent, CommonModule],
  templateUrl: './work-collection.component.html',
  styleUrl: './work-collection.component.scss',
})
export class WorkCollectionComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.getCategories();
  }
}
