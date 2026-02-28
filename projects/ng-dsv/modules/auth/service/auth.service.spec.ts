import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: ReturnType<typeof vi.fn>; get: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    // Création du spy HttpClient avec vi.fn()
    httpClientSpy = {
      get: vi.fn(),
      post: vi.fn(),
    };

    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    }).compileComponents?.();

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.post when googleLogin is called', (done) => {
    const memberData = { user: { id: 1, name: 'John Doe' } };

    // Mock du retour
    httpClientSpy.post.mockReturnValue(of(memberData));

    // Appel de la méthode
    service.googleLogin('token');

    // Comme c'est un signal ou observable interne, on peut utiliser un timeout minimal pour récupérer la valeur
    setTimeout(() => {
      expect(service.userConnected()).toEqual(memberData);
    }, 0);
  });
});