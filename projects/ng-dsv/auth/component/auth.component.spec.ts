import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthGoogleService, AuthService } from '@ng-vagabond-lab/ng-dsv/auth';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { provideTranslateService } from '@ngx-translate/core';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;

  const environmentServiceMock = {
    env: jasmine.createSpy('env').and.returnValue(true),
  };

  const authServiceMock = {
    userConnected: jasmine.createSpy('userConnected').and.returnValue(null),
    loginFromCache: jasmine.createSpy('loginFromCache'),
    logout: jasmine.createSpy('logout'),
  };

  beforeEach(async () => {

    const authGoogleServiceMock = {
      loginWithGoogle: jasmine.createSpy('loginWithGoogle'),
      initGoogleAuth: jasmine.createSpy('initGoogleAuth'),
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
    authServiceMock.userConnected.and.returnValue({ user: { id: '1' } });
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.profile'))).toBeTruthy();
    fixture.debugElement.nativeElement
      .querySelector('.profile dsv-button')
      .click();
  });

  it('should call logout when logout is triggered', () => {
    authServiceMock.userConnected.and.returnValue({ user: { id: '1' } });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.dsv-button');
    button.click();
    fixture.detectChanges();
    const button2 = fixture.nativeElement.querySelectorAll('.dsv-button');
    button2[3].click();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
