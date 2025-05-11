import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/auth';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render login', () => {
    spyOn(authService, 'userConnected').and.callFake(
      signal({
        user: { id: 1 },
      })
    );
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.profile'))).toBeTruthy();
    fixture.debugElement.nativeElement
      .querySelector('.profile dsv-button')
      .click();
  });
});
