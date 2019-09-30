import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintoolbarComponent } from './admintoolbar.component';

describe('AdmintoolbarComponent', () => {
  let component: AdmintoolbarComponent;
  let fixture: ComponentFixture<AdmintoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
