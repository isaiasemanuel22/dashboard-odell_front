import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTableComponent } from './tab-table.component';

describe('TabTableComponent', () => {
  let component: TabTableComponent;
  let fixture: ComponentFixture<TabTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
