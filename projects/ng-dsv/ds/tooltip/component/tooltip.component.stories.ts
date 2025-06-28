import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvButtonComponent } from '../../button';
import { DsvTooltipComponent } from './tooltip.component';

export const ActionsData = {
  text: 'Voici un texte long pour tester le comportement du tooltip avec plus de contenu.',
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
    moduleMetadata: {
      imports: [DsvButtonComponent],
    },
    template: `
      <div style="display: flex; gap: 10px; margin: 30px 0px; flex-wrap: wrap;">
        <dsv-tooltip text="${args.text}" position="right">
          <dsv-button>Survoler moi (right)</dsv-button>
        </dsv-tooltip>
        <dsv-tooltip text="${args.text}" >
          <dsv-button>(top)</dsv-button>
        </dsv-tooltip>
        <dsv-tooltip text="${args.text}" position="bottom">
          <dsv-button>(bottom)</dsv-button>
        </dsv-tooltip>
        <dsv-tooltip text="${args.text}" position="left">
          <dsv-button>(left)</dsv-button>
        </dsv-tooltip>
        <dsv-tooltip text="${args.text}" position="right">
          <dsv-button>(right > left)</dsv-button>
        </dsv-tooltip>
      </div>
    `,
  }),
};
