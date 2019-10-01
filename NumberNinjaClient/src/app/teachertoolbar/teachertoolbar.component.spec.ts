import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachertoolbarComponent } from './teachertoolbar.component';

describe('TeachertoolbarComponent', () => {
  let component: TeachertoolbarComponent;
  let fixture: ComponentFixture<TeachertoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachertoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachertoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
