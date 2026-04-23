import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '@ng-vagabond-lab/ng-dsv/base/service';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';

interface ScrollPosition {
    top: number;
    left: number;
}

@Injectable({ providedIn: 'root' })
export class ScrollService extends BaseService {
    readonly router = inject(RouterService).router;
    readonly routeIds = new Map<string, string>();
    readonly scrolls = signal<Map<string, Map<string, ScrollPosition>>>(new Map());

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

    getScroll(id: string, url: string): ScrollPosition {
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
