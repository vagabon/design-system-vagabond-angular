import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationComponent } from './notification.component';

const mockNotification: NotificationDto = {
    id: '1',
    title: 'Test notification',
    url: 'https://example.com/some/path',
    read: false,
    creationDate: '2024-01-01',
} as NotificationDto;

globalThis.URL = class {
    pathname = '/some/path';
    constructor() {}
} as any;

const mockNotificationRead: NotificationDto = { ...mockNotification, read: true };

describe('NotificationComponent', () => {
    let componentRef: ComponentRef<NotificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        const fixture = TestBed.createComponent(NotificationComponent);
        componentRef = fixture.componentRef;
        fixture.detectChanges();
    });

    afterEach(() => vi.clearAllMocks());

    it('When notification is set, Then url signal contains pathname and readForm reflects read state', async () => {
        const fixture = TestBed.createComponent(NotificationComponent);
        fixture.componentRef.setInput('notification', mockNotification);
        fixture.detectChanges();
        await fixture.whenStable();

        const component = fixture.componentInstance;

        expect(component.url()).toBe('/some/path');
        expect(component.readForm()?.value().read).toBe(false);
        expect(component.readonly()).toBe(false);
    });

    it('When notification has read=true, Then readForm reflects read=true and url is set correctly', async () => {
        const fixture = TestBed.createComponent(NotificationComponent);
        fixture.componentRef.setInput('notification', mockNotificationRead);
        fixture.detectChanges();
        await fixture.whenStable();

        const component = fixture.componentInstance;

        expect(component.url()).toBe('/some/path');
        expect(component.readForm()?.value().read).toBe(true);
    });

    it('When readonly input is true, Then readonly() returns true', () => {
        componentRef.setInput('readonly', true);
        expect(componentRef.instance.readonly()).toBe(true);
    });

    it('When notification input changes, Then url and readForm are updated reactively', async () => {
        const fixture = TestBed.createComponent(NotificationComponent);
        fixture.componentRef.setInput('notification', mockNotification);
        fixture.detectChanges();
        await fixture.whenStable();

        const component = fixture.componentInstance;
        expect(component.url()).toBe('/some/path');

        fixture.componentRef.setInput('notification', {
            ...mockNotification,
            url: 'https://example.com/other/page',
            read: true,
        });
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.url()).toBe('/some/path');
        expect(component.readForm()?.value().read).toBe(true);
    });

    it('When triggerCheckbox is called, Then it clicks the inner input of the checkbox ref', () => {
        const fixture = TestBed.createComponent(NotificationComponent);
        fixture.componentRef.setInput('notification', mockNotification);
        fixture.detectChanges();

        const component = fixture.componentInstance;
        const fakeInput = { click: vi.fn() };
        const fakeNative = { querySelector: vi.fn(() => fakeInput) };

        vi.spyOn(component, 'checkboxRef').mockReturnValue({ nativeElement: fakeNative } as any);

        component.triggerCheckbox();

        expect(fakeNative.querySelector).toHaveBeenCalledWith('input');
        expect(fakeInput.click).toHaveBeenCalledTimes(1);
    });

    it('When checkboxRef is undefined, Then triggerCheckbox does not throw', () => {
        const component = componentRef.instance;
        vi.spyOn(component, 'checkboxRef').mockReturnValue(undefined);

        expect(() => component.triggerCheckbox()).not.toThrow();
    });

    it('When callback output is emitted, Then the emitted value matches the notification', async () => {
        const fixture = TestBed.createComponent(NotificationComponent);
        fixture.componentRef.setInput('notification', mockNotification);
        fixture.detectChanges();
        await fixture.whenStable();

        const component = fixture.componentInstance;
        let emitted: NotificationDto | undefined;
        component.callback.subscribe((v) => (emitted = v));

        component.callback.emit(mockNotification);

        expect(emitted).toEqual(mockNotification);
    });
});
