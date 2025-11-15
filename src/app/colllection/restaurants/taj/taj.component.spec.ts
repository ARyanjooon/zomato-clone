import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TajComponent } from './taj.component';

describe('TajComponent', () => {
  let component: TajComponent;
  let fixture: ComponentFixture<TajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TajComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
