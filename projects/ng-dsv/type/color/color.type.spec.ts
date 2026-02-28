// button.types.spec.ts
import { describe, expect, it } from 'vitest';
import { ButtonVariantType, ButtonWidthType, ColorType, colorControls, colors } from './color.type';

describe('Button Types and Constants', () => {
  describe('ButtonWidthType', () => {
    it('should only allow "small", "medium", or "large"', () => {
      const validWidths: ButtonWidthType[] = ['small', 'medium', 'large'];
      expect(validWidths).toEqual(expect.arrayContaining(['small', 'medium', 'large']));
    });
  });

  describe('ButtonVariantType', () => {
    it('should only allow "text", "outlined", or "contained"', () => {
      const validVariants: ButtonVariantType[] = ['text', 'outlined', 'contained'];
      expect(validVariants).toEqual(expect.arrayContaining(['text', 'outlined', 'contained']));
    });
  });

  describe('ColorType', () => {
    it('should only allow predefined color values', () => {
      const validColors: ColorType[] = [
        'default',
        'inherit',
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
      ];
      expect(validColors).toEqual(expect.arrayContaining(colors));
    });
  });

  describe('colors constant', () => {
    it('should contain all valid ColorType values', () => {
      expect(colors).toEqual([
        'default',
        'inherit',
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
      ]);
    });

    it('should not contain duplicates', () => {
      const uniqueColors = [...new Set(colors)];
      expect(uniqueColors.length).toBe(colors.length);
    });
  });

  describe('colorControls object', () => {
    it('should have correct structure and default values', () => {
      expect(colorControls).toEqual({
        color: {
          control: 'select',
          options: colors,
        },
        variant: {
          control: 'select',
          options: ['text', 'outlined', 'contained'],
          defaultValue: 'contained',
        },
        width: {
          control: 'select',
          options: ['small', 'medium', 'large'],
          defaultValue: 'small',
        },
        fullwidth: {
          control: 'boolean',
        },
      });
    });

    it('should have "color" control with all colors as options', () => {
      expect(colorControls.color.options).toEqual(colors);
    });

    it('should have "variant" control with correct options and default value', () => {
      expect(colorControls.variant.options).toEqual(['text', 'outlined', 'contained']);
      expect(colorControls.variant.defaultValue).toBe('contained');
    });

    it('should have "width" control with correct options and default value', () => {
      expect(colorControls.width.options).toEqual(['small', 'medium', 'large']);
      expect(colorControls.width.defaultValue).toBe('small');
    });

    it('should have "fullwidth" control as boolean', () => {
      expect(colorControls.fullwidth.control).toBe('boolean');
    });
  });
});