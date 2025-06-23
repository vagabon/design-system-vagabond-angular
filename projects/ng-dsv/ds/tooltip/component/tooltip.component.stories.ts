import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvTooltipComponent } from './tooltip.component';

export const ActionsData = {
  text: 'Voici un texte plus long pour tester le comportement du tooltip avec plus de contenu.',
};

const meta: Meta<DsvTooltipComponent> = {
  title: 'dsv/Tooltip',
  component: DsvTooltipComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<DsvTooltipComponent>;

export const Default: Story = {
  args: {
    ...ActionsData,
  },
  render: (args: any) => ({
    template: `
      <div style="display: flex; gap: 10px; margin: 30px 0px;">
        <dsv-tooltip text="${args.text}" position="right">
          <button>Survoler moi (right)</ button >
        </dsv-tooltip>
        <dsv-tooltip text="${args.text}" >
          <button>Survoler moi (top)</ button >
        </dsv-tooltip>
        <dsv-tooltip text="${args.text}" position="bottom">
          <button>Survoler moi (bottom)</ button >
        </dsv-tooltip>
        <dsv-tooltip text="${args.text}" position="left">
          <button>Survoler moi (left)</ button >
        </dsv-tooltip>
        <dsv-tooltip text="${args.text}" position="right">
          <button>Survoler moi (right > left)</ button >
        </dsv-tooltip>
      </div>
    `,
  }),
};
