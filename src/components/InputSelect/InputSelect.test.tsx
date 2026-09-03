import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { InputSelect } from './InputSelect';

const onChange = () => {
  console.log('changed text');
};

const InputSelectOptions = [
  {
    label: 'Available option 1',
    value: 'option 1',
    id: 'option1',
  },
  {
    label: 'Available option 2',
    value: 'option 2',
    id: 'option2',
  },
  {
    label: 'Available option 3',
    value: 'option 3',
    id: 'option3',
  },
];

describe('InputSelect', () => {
  it('Renders select with placeholder', () => {
    const wrapper = render(
      <InputSelect
        name="Name of field"
        title="Select this thing"
        id="exampleId"
        placeholder="Select option"
        options={InputSelectOptions}
        onChange={onChange}
      />
    );

    expect(wrapper.getByText('Select option')).toBeInTheDocument();
  });

  // The arrow is an ::after on the element wrapping the <select>, positioned
  // relative to it — it must wrap only the <select>, not the visible label
  // above it, or the arrow ends up on the label instead of the select box.
  it('wraps the select in its own element, separate from a visible label', () => {
    const wrapper = render(
      <InputSelect
        name="withLabel"
        title="Select this thing"
        label="Select this thing"
        options={InputSelectOptions}
        onChange={onChange}
      />
    );

    const select = wrapper.container.querySelector('select');
    const label = wrapper.container.querySelector('label');
    expect(select?.parentElement).not.toBe(label?.parentElement);
  });
});
