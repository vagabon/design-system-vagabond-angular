import { TooltipPosition, TooltipPositionEnum } from "../dto/tooltip.dto";

export const POSITION_MAX_TOP = 50;
export const POSITION_MAX_BOTTOM = 50;
export const POSITION_MAX_LEFT = 50;
export const POSITION_MAX_RIGHT = 50;

export const getTooltipPosition = (position: TooltipPosition, rect: DOMRect) => {
    if (position === TooltipPositionEnum.TOP && rect.top < POSITION_MAX_TOP) {
        return TooltipPositionEnum.BOTTOM;
    } else if (position === TooltipPositionEnum.BOTTOM && rect.bottom > (window.innerHeight - POSITION_MAX_BOTTOM)) {
        return TooltipPositionEnum.TOP;
    } else if (position === TooltipPositionEnum.LEFT && rect.left < POSITION_MAX_LEFT) {
        return TooltipPositionEnum.RIGHT;
    } else if (position === TooltipPositionEnum.RIGHT && rect.right > (window.innerWidth - POSITION_MAX_RIGHT)) {
        return TooltipPositionEnum.LEFT;
    }
    return position;
}