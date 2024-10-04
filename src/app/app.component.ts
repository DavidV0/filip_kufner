import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AboveTheFoldComponent } from './components/above-the-fold/above-the-fold.component';
import { WorkCollectionComponent } from './components/work-collection/work-collection.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NavbarComponent,
    AboveTheFoldComponent,
    WorkCollectionComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'madebyfilip';
}
