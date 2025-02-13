import type { Meta, StoryObj } from '@storybook/angular';
import { DsvCardComponent } from './card.component';

export const ActionsData = {
  avatar: 'dfds',
  title: 'un Titre',
  subtitle: 'un subtitle',
  image:
    'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  content:
    '<h3>Du contenu</h3><p>un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long </p>',
};

const meta: Meta<DsvCardComponent> = {
  title: 'dsv/Card',
  component: DsvCardComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<DsvCardComponent>;

export const Default: Story = {
  args: {},
  render: (args: DsvCardComponent & { content?: string }) => ({
    template: `<dsv-card title="${args.title}" subtitle="${args.subtitle}" image="${args.image}"> ${args.content} </dsv-card>`,
  }),
};
