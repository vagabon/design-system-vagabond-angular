import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import {
  applicationConfig,
  componentWrapperDecorator,
  moduleMetadata,
  type Preview,
} from '@storybook/angular';
import { of } from 'rxjs';
import { DsvThemeSwitchComponent } from '../ds/theme';
import { DsvThemeComponent } from './../ds/theme/component/dsv.theme.component';

const theme = {
  background: 'rgb(245, 245, 245)',
  primary: 'rgb(48, 100, 197)',
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
    applicationConfig({
      providers: [
        provideZonelessChangeDetection(),
        provideTranslateService(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '' }),
            queryParams: of({}),
            fragment: of(null),
            data: of({}),
            url: of([]),
            snapshot: {
              paramMap: new Map(),
              queryParamMap: new Map(),
              data: {},
            },
          }
        }
      ],
    }),
    moduleMetadata({
      imports: [DsvThemeComponent, DsvThemeSwitchComponent],
    }),
    componentWrapperDecorator((story) => {
      return `
        <dsv-theme [theme]='${themeString}' class="flex flex1" >
          <div style='padding: 5px; margin-bottom: 40px; min-height: 100px; position: relative; display: flex; flex-direction: column; '>
            <div style='margin-bottom: 20px'>
              <dsv-theme-switch></dsv-theme-switch>
            </div>
            ${story}
          </div>
        </dsv-theme>
      `;
    }),
  ],
};

export default preview;
