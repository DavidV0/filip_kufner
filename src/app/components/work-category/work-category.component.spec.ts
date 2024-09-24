import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCategoryComponent } from './work-category.component';

describe('WorkCategoryComponent', () => {
  let component: WorkCategoryComponent;
  let fixture: ComponentFixture<WorkCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
