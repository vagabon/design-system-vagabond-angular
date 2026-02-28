import { makeStateKey, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BaseSeoContainer } from './base.seo.container';

describe('BaseSeoContainer', () => {
    let container: BaseSeoContainer;
    let titleMock: Title;
    let metaMock: Meta;
    let transferStateMock: TransferState;

    beforeEach(() => {
        // Créer des mocks simples pour les services Angular
        titleMock = {
            setTitle: vi.fn(),
        } as unknown as Title;

        metaMock = {
            updateTag: vi.fn(),
        } as unknown as Meta;

        transferStateMock = {
            set: vi.fn(),
        } as unknown as TransferState;

        TestBed.configureTestingModule({
            providers: [
                BaseSeoContainer,
                { provide: Title, useValue: titleMock },
                { provide: Meta, useValue: metaMock },
                { provide: TransferState, useValue: transferStateMock },
            ],
        });

        container = TestBed.inject(BaseSeoContainer);
    });

    it('should set title, description, and image meta tags', () => {
        container.setMeta('MyApp', 'PageTitle', 'Page description', 'https://example.com/image.png');

        expect(titleMock.setTitle).toHaveBeenCalledWith('MyApp - PageTitle');
        expect(transferStateMock.set).toHaveBeenCalledWith(
            makeStateKey<string>('title'),
            'MyApp - PageTitle'
        );
        expect(metaMock.updateTag).toHaveBeenCalledWith({ name: 'description', content: 'Page description' });
        expect(metaMock.updateTag).toHaveBeenCalledWith({ property: 'og:image', content: 'https://example.com/image.png' });
    });

    it('should set title and description only when image is not provided', () => {
        container.setMeta('MyApp', 'PageTitle', 'Page description');

        expect(titleMock.setTitle).toHaveBeenCalledWith('MyApp - PageTitle');
        expect(transferStateMock.set).toHaveBeenCalledWith(
            makeStateKey<string>('title'),
            'MyApp - PageTitle'
        );
        expect(metaMock.updateTag).toHaveBeenCalledWith({ name: 'description', content: 'Page description' });
        expect(metaMock.updateTag).not.toHaveBeenCalledWith(expect.objectContaining({ property: 'og:image' }));
    });
});