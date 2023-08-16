import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import { ButtonVariant, ButtonSize } from '../../models/button'

const clickHandler = vi.fn()
const mockError = vi.fn()

describe('Button', () => {
  beforeEach(() => (console.error = mockError))

  it('Successfully renders a button', () => {
    const wrapper = render(<Button label="Test button" onClick={clickHandler} />)
    expect(wrapper.getByText('Test button')).toBeInTheDocument()
  })

  it('Successfully renders a button that is Naked and Small', () => {
    const wrapper = render(
      <Button
        label="Test button"
        size={ButtonSize.S}
        variant={ButtonVariant.Naked}
        onClick={clickHandler}
      />,
    )

    expect(wrapper.getByText('Test button').closest('button'))
  })

  it('Calls click handler successfully', async () => {
    const wrapper = render(<Button label="Test button" onClick={clickHandler} />)
    await userEvent.click(wrapper.getByRole('button'))
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  it('Does not render a button without a label OR an icon', () => {
    render(<Button onClick={clickHandler} />)
    expect(mockError).toBeCalledWith('A Button needs a label or an icon!')
  })
})
