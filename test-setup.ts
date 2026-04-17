import { provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { vi } from 'vitest';

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
});

getTestBed().configureTestingModule({
    providers: [provideZonelessChangeDetection()],
});

console.error = vi.fn();

class MockDataTransfer {
    effectAllowed: string = 'none';
    dropEffect: string = 'none';
    files: File[] = [];
    types: string[] = [];
    getData(_format: string): string {
        return '';
    }
    setData(_format: string, _data: string): void {}
    clearData(_format?: string): void {}
    setDragImage(_image: Element, _x: number, _y: number): void {}
}

class MockDragEvent extends MouseEvent {
    dataTransfer: DataTransfer;

    constructor(type: string, init?: MouseEventInit) {
        super(type, init);
        this.dataTransfer = new MockDataTransfer() as unknown as DataTransfer;
    }
}

globalThis.DataTransfer = MockDataTransfer as unknown as typeof DataTransfer;
globalThis.DragEvent = MockDragEvent as unknown as typeof DragEvent;

class MockTouch {
    constructor(
        public identifier: number,
        public target: EventTarget,
        public clientX: number,
        public clientY: number,
    ) {}
}

class MockTouchList {
    constructor(public touches: MockTouch[]) {}
    item(index: number) {
        return this.touches[index];
    }
    get length() {
        return this.touches.length;
    }
}

class MockTouchEvent extends Event {
    constructor(type: string, eventInitDict: TouchEventInit = {}) {
        super(type, eventInitDict);
        this.touches = eventInitDict.touches
            ? new MockTouchList(eventInitDict.touches)
            : new MockTouchList([]);
        this.targetTouches = eventInitDict.targetTouches
            ? new MockTouchList(eventInitDict.targetTouches)
            : new MockTouchList([]);
        this.changedTouches = eventInitDict.changedTouches
            ? new MockTouchList(eventInitDict.changedTouches)
            : new MockTouchList([]);
    }
    touches: MockTouchList;
    targetTouches: MockTouchList;
    changedTouches: MockTouchList;
}

global.Touch = MockTouch as any;
global.TouchEvent = MockTouchEvent as any;
global.TouchList = MockTouchList as any;

document.elementFromPoint = () => null;
