import { Component, ComponentRef, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterService } from '@ng-vagabond-lab/ng-dsv/router';
import { MarkdownComponent } from 'ngx-markdown';
import { NewsMarkdownContainer } from './news-markdown.container';

class MarkdownMockClass {
    @Input() data: string | undefined = '';
}
const MarkdownComponentMock = Component({
    selector: 'markdown',
    template: '',
    standalone: true,
})(MarkdownMockClass);

describe('NewsMarkdownContainer', () => {
    let fixture: ComponentFixture<NewsMarkdownContainer>;
    let component: NewsMarkdownContainer;
    let componentRef: ComponentRef<NewsMarkdownContainer>;
    let routerNavigate: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        routerNavigate = vi.fn();
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [NewsMarkdownContainer],
            providers: [{ provide: RouterService, useValue: { router: { navigate: routerNavigate } } }],
            schemas: [NO_ERRORS_SCHEMA],
        }).overrideComponent(NewsMarkdownContainer, {
            remove: { imports: [MarkdownComponent] },
            add: { imports: [MarkdownComponentMock] },
        });

        fixture = TestBed.createComponent(NewsMarkdownContainer);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
    });

    const triggerClick = (href: string | null) => {
        const anchor = document.createElement('a');
        if (href) anchor.setAttribute('href', href);
        const event = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(event, 'target', { value: anchor, configurable: true });
        component.handleClick(event);
    };

    describe('when href starts with /', () => {
        it('then navigates to the path and prevents default', () => {
            componentRef.setInput('data', '');
            triggerClick('/movies/123');
            expect(routerNavigate).toHaveBeenCalledWith(['/movies/123']);
        });
    });

    describe('when href includes movie-keeper.fr', () => {
        it('then strips domain and navigates to path', () => {
            triggerClick('https://movie-keeper.fr/movies/456');
            expect(routerNavigate).toHaveBeenCalledWith(['/movies/456']);
        });
    });

    describe('when href is external', () => {
        it('then does not navigate', () => {
            triggerClick('https://external-site.com/page');
            expect(routerNavigate).not.toHaveBeenCalled();
        });
    });

    describe('when target has no anchor parent', () => {
        it('then does not navigate', () => {
            const event = new MouseEvent('click');
            const div = document.createElement('div');
            Object.defineProperty(event, 'target', { value: div, configurable: true });
            component.handleClick(event);
            expect(routerNavigate).not.toHaveBeenCalled();
        });
    });

    describe('when href is null', () => {
        it('then does not navigate', () => {
            triggerClick(null);
            expect(routerNavigate).not.toHaveBeenCalled();
        });
    });

    describe('when data input is set', () => {
        it('then component reflects the value', () => {
            componentRef.setInput('data', '# Hello');
            fixture.detectChanges();
            expect(component.data()).toBe('# Hello');
        });
    });
});
