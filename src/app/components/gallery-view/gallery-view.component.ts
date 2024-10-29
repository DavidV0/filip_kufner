import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category, SubCategory } from '../../interfaces/category.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gallery-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery-view.component.html',
  styleUrl: './gallery-view.component.scss'
})
export class GalleryViewComponent implements OnInit {
  category$!: Observable<Category | undefined>;
  subCategory?: SubCategory;
  selectedImageIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = params['categoryId'];
      const subCategoryId = params['subCategoryId'];
      
      this.category$ = this.categoryService.getCategoryById(categoryId);
      this.category$.subscribe(category => {
        this.subCategory = category?.subcategories?.find(sub => sub.id === subCategoryId);

        if (!category || !this.subCategory) {
          this.router.navigate(['/work']);
        }
      });
    });
  }

  openLightbox(index: number) {
    this.selectedImageIndex = index;
  }

  closeLightbox() {
    this.selectedImageIndex = -1;
  }

  nextImage() {
    if (this.subCategory && this.selectedImageIndex < this.subCategory.images.length - 1) {
      this.selectedImageIndex++;
    }
  }

  previousImage() {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedImageIndex === -1) return;

    switch(event.key) {
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'Escape':
        this.closeLightbox();
        break;
    }
  }

  openCategorySelector(): void {
    // Navigate to work path with state to open category selector
    this.router.navigate(['/work'], { 
      state: { openSelector: true }
    });
  }
} 
