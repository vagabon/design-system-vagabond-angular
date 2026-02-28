import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { AuthGoogleService, AuthService } from '@ng-vagabond-lab/ng-dsv/modules/auth';
import { provideTranslateService } from '@ngx-translate/core';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;

  const environmentServiceMock = {
    env: jest.fn().mockReturnValue(true),
  };

  const authServiceMock = {
    userConnected: jest.fn().mockReturnValue(null),
    loginFromCache: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    const authGoogleServiceMock = {
      loginWithGoogle: jest.fn(),
      initGoogleAuth: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideTranslateService(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: AuthGoogleService, useValue: authGoogleServiceMock },
        { provide: EnvironmentService, useValue: environmentServiceMock }
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render login', () => {
    authServiceMock.userConnected.mockReturnValue({ user: { id: '1' } });
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.profile'))).toBeTruthy();
    fixture.debugElement.nativeElement
      .querySelector('.profile dsv-button')
      .click();
  });

  it('should call logout when logout is triggered', () => {
    authServiceMock.userConnected.mockReturnValue({ user: { id: '1' } });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.dsv-button');
    button.click();
    fixture.detectChanges();
    const button2 = fixture.nativeElement.querySelectorAll('.dsv-button');
    button2[3].click();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});