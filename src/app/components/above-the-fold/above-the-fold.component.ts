import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { WorkCollectionComponent } from "../work-collection/work-collection.component";

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [WorkCollectionComponent],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent implements AfterViewInit {


  @ViewChild('backgroundVideo', { static: false }) videoElement!: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    if (this.videoElement) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.muted = true;  
      video.play().catch(err => console.error('Autoplay prevented:', err));  
    }
  }
}
