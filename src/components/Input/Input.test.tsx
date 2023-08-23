import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('Renders input with text and placeholder', () => {
    const wrapper = render(
      <Input
        label="Test label"
        name="testName"
        placeholder="Test placeholder"
        onChange={() => null}
      />
    );

    const inputEl = wrapper.getByLabelText('Test label');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('name', 'testName');
    expect(inputEl).toHaveAttribute('placeholder', 'Test placeholder');
  });

  it('Renders input with error message', () => {
    const wrapper = render(
      <Input
        label="Test label"
        name="testName"
        message="Error message"
        messageType="error"
        onChange={() => null}
      />
    );

    expect(wrapper.getByText('Error message')).toBeInTheDocument();
  });

  it('Renders input with success message', () => {
    const wrapper = render(
      <Input
        label="Test label"
        name="testName"
        message="Success message"
        messageType="success"
        onChange={() => null}
      />
    );

    expect(wrapper.getByText('Success message')).toBeInTheDocument();
  });

  it('Renders input with warning message', () => {
    const wrapper = render(
      <Input
        label="Test label"
        name="testName"
        message="Warning message"
        messageType="warning"
        onChange={() => null}
      />
    );

    expect(wrapper.getByText('Warning message')).toBeInTheDocument();
  });
});
