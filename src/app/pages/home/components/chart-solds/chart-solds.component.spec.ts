import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSoldsComponent } from './chart-solds.component';

describe('ChartSoldsComponent', () => {
  let component: ChartSoldsComponent;
  let fixture: ComponentFixture<ChartSoldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSoldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSoldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
