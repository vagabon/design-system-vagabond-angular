import { StoryContext, StoryFn } from "@storybook/angular";

export type ButtonWidthType = 'small' | 'medium' | 'large';
export type ButtonVariantType = 'text' | 'outlined' | 'contained';

export type ColorType =
  | 'default'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

export const colors: ColorType[] = [
  'default'
  , 'inherit'
  , 'primary'
  , 'secondary'
  , 'success'
  , 'info'
  , 'warning'
  , 'error'
];

export const colorControls = {
  color: {
    control: 'select',
    options: colors,
  },
  variant: {
    control: 'select',
    options: ['text', 'outlined', 'contained'], defaultValue: 'contained',
  },
  width: { control: 'select', options: ['small', 'medium', 'large'], defaultValue: 'small' },
  fullwidth: {
    control: 'boolean'
  },
}

export const storyBig = (story: StoryFn) => {
  const storyOutput = story({}, {} as StoryContext);
  return {
    ...storyOutput,
    template: `
          <div style="height: calc(300px - 10px); overflow: hidden;">
            ${storyOutput.template}
          </div>
        `,
  };
}