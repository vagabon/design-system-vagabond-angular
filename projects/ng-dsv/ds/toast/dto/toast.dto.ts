export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface IToastDto {
  uuid?: string;
  text: string;
  isClose?: boolean;
  type?: ToastType;
  filled?: boolean;
  duration?: number;
  durationLeft?: number;
}
