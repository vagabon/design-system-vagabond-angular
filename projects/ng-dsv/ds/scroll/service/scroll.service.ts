import { inject, Injectable, signal } from '@angular/core';
import { BaseApiService } from '@ng-vagabond-lab/ng-dsv/base/service';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { ScrollPositionDto } from '../dto/scroll.position.dto';

@Injectable({ providedIn: 'root' })
export class ScrollService extends BaseApiService {
    readonly router = inject(RouterService).router;
    readonly routeIds = new Map<string, string>();
    readonly scrolls = signal<Map<string, Map<string, ScrollPositionDto>>>(new Map());

    getRouteUuid(index: number = 0): string {
        const key = `${this.router.url}__${index}`;
        if (!this.routeIds.has(key)) {
            this.routeIds.set(key, crypto.randomUUID());
        }
        return this.routeIds.get(key)!;
    }

    saveScroll(id: string, url: string, top: number, left: number) {
        this.scrolls.update((map) => {
            const newMap = new Map(map);
            const urlMap = new Map(newMap.get(id) ?? []);
            urlMap.set(url, { top, left });
            newMap.set(id, urlMap);
            return newMap;
        });
    }

    getScroll(id: string, url: string): ScrollPositionDto {
        return this.scrolls().get(id)?.get(url) ?? { top: 0, left: 0 };
    }

    clear(id: string) {
        this.scrolls.update((map) => {
            const newMap = new Map(map);
            newMap.delete(id);
            return newMap;
        });
    }
}
