import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAndRepairComponent } from './service-and-repair.component';

describe('ServiceAndRepairComponent', () => {
  let component: ServiceAndRepairComponent;
  let fixture: ComponentFixture<ServiceAndRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAndRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAndRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
