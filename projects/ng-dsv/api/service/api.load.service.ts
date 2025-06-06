import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiLoadService {
  load = signal<boolean>(false);
}
