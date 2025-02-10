import {
  componentWrapperDecorator,
  moduleMetadata,
  type Preview,
} from '@storybook/angular';
import { DsvThemeSwitchComponent } from '../src/lib/theme/switch/component/dsv.theme.switch.component';
import { DsvThemeComponent } from './../src/lib/theme/component/dsv.theme.component';

const theme = {
  primary: '#2943c6',
  text: '#FFF',
};
const themeString = JSON.stringify(theme);

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsvThemeComponent, DsvThemeSwitchComponent],
    }),
    componentWrapperDecorator((story) => {
      return `<dsv-theme [theme]='${themeString}' class="flex flex1 margin5">
        <div style='margin-bottom: 20px'>
          <dsv-theme-switch></dsv-theme-switch>
        </div>
        ${story}
      </dsv-theme>`;
    }),
  ],
};

export default preview;
