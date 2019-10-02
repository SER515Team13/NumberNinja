import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AdminComponent} from './admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule } from '@angular/material/select';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbars/studenttoolbar/studenttoolbar.component';
import { TeachertoolbarComponent } from './toolbars/teachertoolbar/teachertoolbar.component';
import { AdmintoolbarComponent } from './toolbars/admintoolbar/admintoolbar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSelectModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        AdminComponent,
        ToolbarComponent,
        TeachertoolbarComponent,
        AdmintoolbarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'NumberNinja'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('NumberNinja');
  });

  // The app.component.html was modifies to remove unnecessary things, this test in not valid anymore.
  xit('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('NumberNinja app is running!');
  });
});
