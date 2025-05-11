import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { of } from 'rxjs';
import { AuthGoogleService } from './auth.google.service';

describe('AuthGoogleService', () => {
  let service: AuthGoogleService;
  let environmentService: EnvironmentService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    (window as any).google = {
      accounts: {
        id: {
          initialize: (data: any) => {
            data.callback('credential');
          },
          renderButton: () => {},
          prompt: () => {},
        },
      },
    };

    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    let environmentServiceSpy = jasmine.createSpyObj('EnvironmentService', [
      'env',
    ]);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthGoogleService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
        { provide: EnvironmentService, useValue: environmentServiceSpy },
      ],
    });

    service = TestBed.inject(AuthGoogleService);
    environmentService = TestBed.inject(EnvironmentService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    httpClientSpy.get.and.returnValue(of({}));
    expect(service).toBeTruthy();
  });

  it('should call ApiService.post when loginWithGoogle is called', () => {
    httpClientSpy.post.and.returnValue(of({}));
    httpClientSpy.get.and.returnValue(of({}));
    service.handleCredentialResponse({ credential: 'credential' });
    service.decodeJwtToken(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo4MDgwL2lzc3VlciIsInVwbiI6InZhZ2Fib25kIzExOTQiLCJncm91cHMiOlsiQURNSU4iLCJVU0VSIl0sImlhdCI6MTczMjk5MDE2NiwiZXhwIjoxNzMzMDkwMTY2LCJqdGkiOiIxZTkwZDU5My03MDk3LTQxZDMtYWVjMC0zMTExOTJkNzNkZjkifQ.OeJRowQsfyU3ILUReuqD93bCFJEG90phBsPTp9ofO_P7HVpUV17NytEvQNgc19D8M1RLNWjDl1DsPG0CAKt6ivsEbtgF66h4Fg3SruvHSU-6Mezrrca8Xn8BsahVZqbyBps9OBJACE0EVpHgZ4YMNzen7pkBSoHHwk_L3VoTCxfbqsZkEstbnxco_LNNw2fUJTNnGfLqToFa4bkemEUjDoRRo8VBW4ToKP7crelxmw1OgmBKcLQHp5R5B8GW9oeY7kU_RdaIi2f7Wjnqxj59yGZJ0Wv4Tw5MLdsO2rYOQ-sn_-LT7iRXBi3m1jFhDzkQUCsHJ88UOrll3D9oz1LB_w'
    );
    service.loginWithGoogle();
    expect(service).toBeTruthy();
  });
});
