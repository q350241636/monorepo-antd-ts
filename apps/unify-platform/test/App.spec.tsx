import Adapter from 'enzyme-adapter-react-16'
import App from '../src/App'
import React from 'react'
import toJson from 'enzyme-to-json'
import { configure, render } from 'enzyme'
// import renderer from 'react-test-renderer'
configure({ adapter: new Adapter() })
// import ReactDOM from 'react-dom'

it('renders correctly', () => {
  const tree = render(<App />)
  expect(toJson(tree)).toMatchSnapshot()
})

// it('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<App />, div)
//   ReactDOM.unmountComponentAtNode(div)
// })
