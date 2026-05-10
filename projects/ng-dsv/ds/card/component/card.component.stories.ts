import { Component } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DsvButtonComponent } from '../../button';
import { CardActionComponent } from './action/card.action.component';
import { DsvCardComponent } from './card.component';
import { CardHeaderComponent } from './header/card.header.component';
import { CardImgComponent } from './img/card.img.component';

export const ActionsData = {
    avatar: 'dfds',
    title: 'un Titre',
    subtitle: 'un subtitle',
    image: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
};

@Component({
    selector: 'storybook-wrapper',
    standalone: true,
    imports: [
        CardImgComponent,
        CardHeaderComponent,
        CardActionComponent,
        DsvCardComponent,
        DsvButtonComponent,
    ],
    template: `
        <dsv-card>
            <dsv-card-img
                src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                alt=""
            />
            <dsv-card-header>
                <h2 class="no-margin">
                    <i class="fas fa-user"></i>
                    {{ title }}
                </h2>
                <div class="card-subtitle">{{ subtitle }}</div>
            </dsv-card-header>
            <h3>Du contenu</h3>
            <p>
                un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long
                un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long
                un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long
                un paragraphe long un paragraphe long un paragraphe long un paragraphe long un paragraphe long
                un paragraphe long
            </p>
            <dsv-card-action>
                <dsv-button variant="primary">Action 1</dsv-button>
                <dsv-button variant="primary">Action 2</dsv-button>
            </dsv-card-action>
        </dsv-card>
    `,
})
class CardWrapperComponent {}

const meta: Meta<CardWrapperComponent> = {
    title: 'dsv/Card',
    component: CardWrapperComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    decorators: [moduleMetadata({})],
    args: {
        ...ActionsData,
    },
};

export default meta;
type Story = StoryObj<CardWrapperComponent>;

export const Default: Story = {
    args: {},
    parameters: {
        docs: {
            source: {
                code: `
                    <dsv-card>
                        <dsv-card-img src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" alt="" />
                        <h3>Du contenu</h3>
                        <p>
                            un paragraphe long un paragraphe long un paragraphe long un paragraphe 
                            long un paragraphe long un paragraphe long un paragraphe long un paragraphe 
                            long un paragraphe long un paragraphe long un paragraphe long un paragraphe 
                            long un paragraphe long un paragraphe long un paragraphe long un paragraphe 
                            long un paragraphe long un paragraphe long un paragraphe long un paragraphe 
                            long un paragraphe long
                        </p>
                    </dsv-card>
                `,
            },
        },
    },
};
