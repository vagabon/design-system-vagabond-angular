import { OutputEmitterRef } from '@angular/core';

export const isCallback = <T>(callback: OutputEmitterRef<T>) => {
    const listeners = callback['listeners' as keyof OutputEmitterRef<T>];
    return listeners?.length > 0;
};

export const generateArray = (length: number = 20) => Array.from({ length }, (_, i) => i);
