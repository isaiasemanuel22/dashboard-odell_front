import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilamentsComponent } from './list-filaments.component';

describe('ListFilamentsComponent', () => {
  let component: ListFilamentsComponent;
  let fixture: ComponentFixture<ListFilamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFilamentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFilamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
