import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category, SubCategory } from '../../interfaces/category.interface';
import { WorkCollectionComponent } from "../work-collection/work-collection.component";

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, WorkCollectionComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent implements OnInit {
  selectedCategory?: Category | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['categoryId']) {
        this.selectedCategory = this.categoryService.getCategoryById(params['categoryId']);
        if (!this.selectedCategory) {
          this.router.navigate(['/home']);
        }
      }
    });

  
  }

  onSubCategoryClick(subCategory: SubCategory) {
    if (this.selectedCategory) {
      this.router.navigate(['/work', this.selectedCategory.id, subCategory.id]);
    }
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

 

  clearSelectedCategory(): void {
    this.selectedCategory = null;
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/images/placeholder.png'; 
  }
}
