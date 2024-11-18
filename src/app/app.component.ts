import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AboveTheFoldComponent } from './components/above-the-fold/above-the-fold.component';
import { WorkCollectionComponent } from './components/work-collection/work-collection.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ConnectComponent } from './components/connect/connect.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    AboveTheFoldComponent,
    WorkCollectionComponent,
    FooterComponent,
    AboutMeComponent,
    ConnectComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'madebyfilip';
}
