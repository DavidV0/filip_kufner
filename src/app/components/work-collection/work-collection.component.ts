import { Component } from '@angular/core';
import { WorkCategoryComponent } from '../work-category/work-category.component';

@Component({
  selector: 'app-work-collection',
  standalone: true,
  imports: [WorkCategoryComponent],
  templateUrl: './work-collection.component.html',
  styleUrl: './work-collection.component.scss',
})
export class WorkCollectionComponent {}
