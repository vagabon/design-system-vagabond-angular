import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TabDto } from '../../public-api';
import { DsvTabsComponent } from './tabs.component';

describe('TabsComponent', () => {
    let component: DsvTabsComponent;
    let fixture: ComponentFixture<DsvTabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvTabsComponent],
            providers: [
                provideTranslateService(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ movieId: '42' }),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvTabsComponent);
        component = fixture.componentInstance;

        const mockTabs: TabDto[] = [
            { id: 'home', title: 'Accueil', url: '/tab1' },
            { id: 'settings', title: 'Paramètres', url: '/tab2' },
        ];

        fixture.componentRef.setInput('tabs', mockTabs);
        fixture.componentRef.setInput('active', 'home');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should receive tabs and active input', () => {
        expect(component.tabs()).toEqual([
            { id: 'home', title: 'Accueil', url: '/tab1' },
            { id: 'settings', title: 'Paramètres', url: '/tab2' },
        ]);
        expect(component.active()).toBe('home');
    });
});
