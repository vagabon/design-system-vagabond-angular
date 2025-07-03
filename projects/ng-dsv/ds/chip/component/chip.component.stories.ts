import { colorControls } from '@ng-vagabond-lab/ng-dsv/type';
import type { Meta, StoryObj } from '@storybook/angular';
import { DsvChipComponent } from './chip.component';

export const ActionsData = {
  text: 'text',
  width: 'small',
  variant: 'contained',
  color: 'default',
};

const meta: Meta<DsvChipComponent> = {
  title: 'dsv/Chip',
  component: DsvChipComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {
    ...colorControls as Meta<DsvChipComponent>['argTypes'],
    delete: { action: 'function', control: false },
  },
  args: {
    ...ActionsData as Meta<DsvChipComponent>['args'],
  },
};

export default meta;
type Story = StoryObj<DsvChipComponent>;

export const Default: Story = {
  args: {
    delete: () => { },
  },
  render: (args: any) => ({
    props: {
      delete: args.delete,
    },
    template: `
      <div class="flex flex-row gap10">
        <dsv-chip text="${args.text}" width="${args.width}" variant="${args.variant}" color="${args.color}" [fullwidth]="${args.fullwidth}" />
        <dsv-chip text="${args.text}" width="${args.width}" variant="${args.variant}" color="${args.color}" [fullwidth]="${args.fullwidth}" (delete)="delete" />
      </div>
    `
  }),
};

export const NoDelete: Story = {
  args: {
  },
  render: (args: any) => ({
    template: `
      <dsv-chip text="${args.text}" width="${args.width}" variant="${args.variant}" color="${args.color}" [fullwidth]="${args.fullwidth}" />
    `
  }),

};

export const WithDelete: Story = {
  args: {
    delete: () => { },
  },

};
