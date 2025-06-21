import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TabDto } from '../../public-api';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsComponent],
            providers: [
                provideZonelessChangeDetection(),
                provideTranslateService(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ movieId: '42' }),
                    },
                },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;

        const mockTabs: TabDto[] = [
            { id: 'home', title: 'Accueil', url: '/tab1' },
            { id: 'settings', title: 'Paramètres', url: '/tab2' }
        ];

        component.tabs = signal(mockTabs) as unknown as InputSignal<TabDto[]>;
        component.active = signal('home') as unknown as InputSignal<string>;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should receive tabs and active input', () => {
        expect(component.tabs()).toEqual([
            { id: 'home', title: 'Accueil', url: '/tab1' },
            { id: 'settings', title: 'Paramètres', url: '/tab2' }
        ]);
        expect(component.active()).toBe('home');
    });
});
