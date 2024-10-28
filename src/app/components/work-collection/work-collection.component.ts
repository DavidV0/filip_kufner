import { Component, OnInit } from '@angular/core';
import { WorkCategoryComponent } from '../work-category/work-category.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-work-collection',
  standalone: true,
  imports: [WorkCategoryComponent, CommonModule],
  templateUrl: './work-collection.component.html',
  styleUrl: './work-collection.component.scss',
})
export class WorkCollectionComponent implements OnInit {
  categories$: Observable<Category[]>;
  isLoading = true;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit() {
    // Subscribe to check when data is loaded
    this.categories$.subscribe({
      next: (categories) => {
        this.isLoading = false;
        if (!categories?.length) {
          console.warn('No categories loaded');
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.isLoading = false;
      }
    });
  }
}
