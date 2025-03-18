import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeMaterialComponent } from './list-type-material.component';

describe('ListTypeMaterialComponent', () => {
  let component: ListTypeMaterialComponent;
  let fixture: ComponentFixture<ListTypeMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTypeMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
