import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgarComponent } from './burgar.component';

describe('BurgarComponent', () => {
  let component: BurgarComponent;
  let fixture: ComponentFixture<BurgarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurgarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
