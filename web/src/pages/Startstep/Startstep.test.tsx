import { render } from '@redwoodjs/testing/web'

import Startstep from './startstep'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('Startstep', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Startstep />)
    }).not.toThrow()
  })
})
