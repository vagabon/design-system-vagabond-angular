export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastDto {
    uuid?: string;
    text: string;
    open?: boolean;
    type?: ToastType;
    filled?: boolean;
    closeAll?: boolean;
    duration?: number;
    remainingDuration?: number;
    interval?: ReturnType<typeof setInterval>;
}
