import { OutputEmitterRef } from '@angular/core';

export const isCallback = <T>(callback: OutputEmitterRef<T>): boolean => {
    const listeners = callback['listeners' as keyof OutputEmitterRef<T>];
    return listeners?.length > 0;
};

export const generateArray = (length: number = 20): number[] => Array.from({ length }, (_, i) => i);
