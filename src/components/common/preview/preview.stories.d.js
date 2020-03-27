import React from 'react';
import { storiesOf } from '@storybook/react';
import Preview from './preview.jsx';
import { withPreview, previewTemplate, DEFAULT_VANILLA_CODESANDBOX } from "storybook-addon-preview";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

const stories = storiesOf("Example", module);

stories.addDecorator(withKnobs).addDecorator(withPreview);

stories.add("Example", e => {
    const opt1 = boolean("opt1", false);
    const opt2 = number("num1", 0);

    return <Preview  disabled={opt1}>{opt2}</Preview>

}, {
    preview: [
        {
            tab: "Vanilla",
            template: previewTemplate`
                const inst = new Instance({
                    opt1: ${"opt1"},
                    num1: ${"num1"},
                });
            `,
            language: "jsx",
            copy: true,
            codesandbox: DEFAULT_VANILLA_CODESANDBOX(["@egjs/infinitegrid"]),
        },
    ]
});