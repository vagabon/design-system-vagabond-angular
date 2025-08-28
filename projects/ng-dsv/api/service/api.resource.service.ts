import { httpResource } from "@angular/common/http";
import { Injectable, ResourceRef, signal } from "@angular/core";
import { OrderState } from "../public-api";


export interface ApiFindBy {
    endPoint?: string,
    fields?: string,
    values?: string,
    first?: number,
    max?: number,
    order?: OrderState
}

@Injectable({
    providedIn: 'root',
})
export class ApiResourceService<T> {

    url = signal<string | undefined>(undefined);

    resource: ResourceRef<T | undefined> = httpResource(() => ({
        url: `${this.url()}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
        },
        reportProgress: true,
        transferCache: true,
        keepalive: true,
        mode: 'same-origin',
        redirect: 'error',
        priority: 'high',
        cache: 'force-cache',
        credentials: 'include',
        referrer: 'no-referrer',
        integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GhEXAMPLEKEY='
    }));;

    constructor(
    ) {
    }
}