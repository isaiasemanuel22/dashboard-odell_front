import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMachineComponent } from './config-machine.component';

describe('ConfigMachineComponent', () => {
  let component: ConfigMachineComponent;
  let fixture: ComponentFixture<ConfigMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
