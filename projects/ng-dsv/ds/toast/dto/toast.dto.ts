export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastDto {
  uuid?: string;
  text: string;
  open?: boolean;
  type?: ToastType;
  filled?: boolean;
  duration?: number;
  remainingDuration?: number;
}
