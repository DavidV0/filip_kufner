import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-category.component.html',
  styleUrl: './work-category.component.scss',
})
export class WorkCategoryComponent {
  @Input() title: string = '';
  @Input() imageUrl: string = '';
}
