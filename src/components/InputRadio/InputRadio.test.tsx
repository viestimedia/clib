import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { InputRadio } from './InputRadio';

const InputRadioOptions = [
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

describe('InputRadio', () => {
  it('Renders radio button with text', () => {
    const wrapper = render(
      <InputRadio
        label="Name of field"
        name="inputRadioExample"
        options={InputRadioOptions}
        value="option 2"
        onChange={() => console.log('changed')}
      />
    );

    expect(wrapper.getByText('Name of field')).toBeInTheDocument();
    expect(wrapper.getByText('Available option 1')).toBeInTheDocument();
    expect(wrapper.getByText('Available option 2')).toBeInTheDocument();
    expect(wrapper.getByText('Available option 3')).toBeInTheDocument();
  });
});
