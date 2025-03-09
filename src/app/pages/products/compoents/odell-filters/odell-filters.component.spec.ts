import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdellFiltersComponent } from './odell-filters.component';

describe('OdellFiltersComponent', () => {
  let component: OdellFiltersComponent;
  let fixture: ComponentFixture<OdellFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdellFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdellFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
