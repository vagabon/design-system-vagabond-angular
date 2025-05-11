import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbarComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SearchbarComponent);
    const app = fixture.componentInstance;
    app.search = 'search';
    const onSearchSpy = jasmine.createSpy('onSearchSpy');
    app.onSearch = signal(onSearchSpy);

    fixture.detectChanges();

    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    input.value = 'search';
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    });
    input.dispatchEvent(event);

    fixture.detectChanges();

    expect(app).toBeTruthy();
    expect(onSearchSpy).toHaveBeenCalledWith('search');
  });
});
