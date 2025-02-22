import {
  componentWrapperDecorator,
  moduleMetadata,
  type Preview,
} from '@storybook/angular';
import { DsvThemeComponent } from './../ds/theme/component/dsv.theme.component';
import { DsvThemeSwitchComponent } from './../ds/theme/switch/component/dsv.theme.switch.component';

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
      return `<dsv-theme [theme]='${themeString}' class="flex flex1" >
        <div style='padding: 5px'>
          <div style='margin-bottom: 20px'>
            <dsv-theme-switch></dsv-theme-switch>
          </div>
          ${story}
        </div>
      </dsv-theme>`;
    }),
  ],
};

export default preview;
