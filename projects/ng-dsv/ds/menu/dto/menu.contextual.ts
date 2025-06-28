
export const CLICK_LEFT = 'left';
export const CLICK_RIGHT = 'right';

export type MenuContextualClickType = typeof CLICK_LEFT | typeof CLICK_RIGHT;

export interface MenuContextualDto {
    id: string,
    icon?: string,
    text: string,
    divider?: boolean,
    color?: string,
}
