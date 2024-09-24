import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCollectionComponent } from './work-collection.component';

describe('WorkCollectionComponent', () => {
  let component: WorkCollectionComponent;
  let fixture: ComponentFixture<WorkCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
