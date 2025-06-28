
export const CLICK_LEFT = 'left';
export const CLICK_RIGHT = 'right';
export const CLICK_BOTH = 'both';

export type MenuContextualClickType = typeof CLICK_LEFT | typeof CLICK_RIGHT | typeof CLICK_BOTH;

export interface MenuContextualDto {
    id: string,
    icon?: string,
    text: string,
    divider?: boolean,
    color?: string,
}
