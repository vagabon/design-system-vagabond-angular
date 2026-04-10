import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthGoogleService } from './auth.google.service';

describe('AuthGoogleService', () => {
  let service: AuthGoogleService;
  let environmentService: EnvironmentService;
  let httpClientSpy: { post: ReturnType<typeof vi.fn>; get: ReturnType<typeof vi.fn> };
  let environmentServiceSpy: { env: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    (window as any).google = {
      accounts: {
        id: {
          initialize: (data: any) => {
            data.callback({ credential: 'credential' });
          },
          renderButton: () => { },
          prompt: () => { },
        },
      },
    };

    httpClientSpy = {
      get: vi.fn(),
      post: vi.fn(),
    };

    environmentServiceSpy = {
      env: vi.fn(),
    };

    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AuthGoogleService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: EnvironmentService, useValue: environmentServiceSpy },
      ],
    }).compileComponents?.();

    service = TestBed.inject(AuthGoogleService);
    environmentService = TestBed.inject(EnvironmentService);
  });

  it('should be created', () => {
    httpClientSpy.get.mockReturnValue(of({}));
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.post when loginWithGoogle is called', () => {
    httpClientSpy.post.mockReturnValue(of({}));
    httpClientSpy.get.mockReturnValue(of({}));

    service.handleCredentialResponse({ credential: 'credential' });

    service.decodeJwtToken(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo4MDgwL2lzc3VlciIsInVwbiI6InZhZ2Fib25kIzExOTQiLCJncm91cHMiOlsiQURNSU4iLCJVU0VSIl0sImlhdCI6MTczMjk5MDE2NiwiZXhwIjoxNzMzMDkwMTY2LCJqdGkiOiIxZTkwZDU5My03MDk3LTQxZDMtYWVjMC0zMTExOTJkNzNkZjkifQ.OeJRowQsfyU3ILUReuqD93bCFJEG90phBsPTp9ofO_P7HVpUV17NytEvQNgc19D8M1RLNWjDl1DsPG0CAKt6ivsEbtgF66h4Fg3SruvHSU-6Mezrrca8Xn8BsahVZqbyBps9OBJACE0EVpHgZ4YMNzen7pkBSoHHwk_L3VoTCxfbqsZkEstbnxco_LNNw2fUJTNnGfLqToFa4bkemEUjDoRRo8VBW4ToKP7crelxmw1OgmBKcLQHp5R5B8GW9oeY7kU_RdaIi2f7Wjnqxj59yGZJ0Wv4Tw5MLdsO2rYOQ-sn_-LT7iRXBi3m1jFhDzkQUCsHJ88UOrll3D9oz1LB_w'
    );

    service.loginWithGoogle();

    expect(service).toBeTruthy();

    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});