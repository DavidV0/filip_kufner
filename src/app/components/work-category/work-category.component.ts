import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-category.component.html',
  styleUrls: ['./work-category.component.scss'],
})
export class WorkCategoryComponent {
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() categoryId: string = '';

  constructor(private router: Router) {}

  onCategoryClick() {
    this.router.navigate(['/work', this.categoryId]);
  }
}
