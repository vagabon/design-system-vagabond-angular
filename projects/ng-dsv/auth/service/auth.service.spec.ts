import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });

    service = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call ApiService.post when googleLogin is called', () => {
    const memberData = { user: { id: 1, name: 'John Doe' } };

    httpClientSpy.post.and.returnValue(of(memberData));

    service.googleLogin('token');

    expect(service.userConnected()).toBe(memberData);
  });
});
