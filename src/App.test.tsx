import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import {store} from './store/index'

window.scrollTo = jest.fn();    // fixes Error: Not implemented: window.scrollTo

test('renders title', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const title = screen.getByText('Pokédex');
  expect(title).toBeInTheDocument();
})

test('renders name in footer', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const name = screen.getByText('Maria Edlinger');
  expect(name).toBeInTheDocument();
})
