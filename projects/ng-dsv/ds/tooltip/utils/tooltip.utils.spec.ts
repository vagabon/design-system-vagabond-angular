import { TooltipPositionEnum } from '../dto/tooltip.dto';
import { getTooltipPosition, POSITION_MAX_BOTTOM, POSITION_MAX_LEFT, POSITION_MAX_RIGHT, POSITION_MAX_TOP } from './tooltip.utils';

describe('getTooltipPosition', () => {
    let mockRect: DOMRect;

    beforeEach(() => {
        mockRect = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON: () => { }
        };
    });

    it('should return BOTTOM if TOP position and rect.top is less than POSITION_MAX_TOP', () => {
        mockRect = {
            ...mockRect,
            top: POSITION_MAX_TOP - 10
        }
        const position = getTooltipPosition(TooltipPositionEnum.TOP, mockRect);
        expect(position).toBe(TooltipPositionEnum.BOTTOM);
    });

    it('should return TOP if BOTTOM position and rect.bottom is greater than window.innerHeight - POSITION_MAX_BOTTOM', () => {
        mockRect = {
            ...mockRect,
            bottom: window.innerHeight - POSITION_MAX_BOTTOM + 10
        }
        const position = getTooltipPosition(TooltipPositionEnum.BOTTOM, mockRect);
        expect(position).toBe(TooltipPositionEnum.TOP);
    });

    it('should return RIGHT if LEFT position and rect.left is less than POSITION_MAX_LEFT', () => {
        mockRect = {
            ...mockRect,
            left: POSITION_MAX_LEFT - 10
        }
        const position = getTooltipPosition(TooltipPositionEnum.LEFT, mockRect);
        expect(position).toBe(TooltipPositionEnum.RIGHT);
    });

    it('should return LEFT if RIGHT position and rect.right is greater than window.innerWidth - POSITION_MAX_RIGHT', () => {
        mockRect = {
            ...mockRect,
            right: window.innerWidth - POSITION_MAX_RIGHT + 10
        }
        const position = getTooltipPosition(TooltipPositionEnum.RIGHT, mockRect);
        expect(position).toBe(TooltipPositionEnum.LEFT);
    });

    it('should return the same position if no adjustments are needed', () => {
        mockRect = {
            ...mockRect,
            top: POSITION_MAX_TOP + 10,
            left: POSITION_MAX_LEFT + 10,
            right: window.innerWidth - POSITION_MAX_RIGHT - 10,
            bottom: window.innerHeight - POSITION_MAX_BOTTOM - 10
        }

        const topPosition = getTooltipPosition(TooltipPositionEnum.TOP, mockRect);
        const bottomPosition = getTooltipPosition(TooltipPositionEnum.BOTTOM, mockRect);
        const leftPosition = getTooltipPosition(TooltipPositionEnum.LEFT, mockRect);
        const rightPosition = getTooltipPosition(TooltipPositionEnum.RIGHT, mockRect);

        expect(topPosition).toBe(TooltipPositionEnum.TOP);
        expect(bottomPosition).toBe(TooltipPositionEnum.BOTTOM);
        expect(leftPosition).toBe(TooltipPositionEnum.LEFT);
        expect(rightPosition).toBe(TooltipPositionEnum.RIGHT);
    });
});
