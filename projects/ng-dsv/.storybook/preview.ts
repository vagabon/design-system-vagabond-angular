import {
  componentWrapperDecorator,
  moduleMetadata,
  type Preview,
} from '@storybook/angular';
import { DsvThemeComponent } from '../src/lib/theme/dsv.theme.component';

const theme = {
  primary: '#d76c00',
  text: '#FFF',
};
const themeString = JSON.stringify(theme);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsvThemeComponent],
    }),
    componentWrapperDecorator((story) => {
      return `<dsv-theme [theme]='${themeString}'>${story}</dsv-theme>`;
    }),
  ],
};

export default preview;
