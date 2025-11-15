import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColllectionComponent } from './colllection.component';

describe('ColllectionComponent', () => {
  let component: ColllectionComponent;
  let fixture: ComponentFixture<ColllectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColllectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColllectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
