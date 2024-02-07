import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

test('renders a message', () => {
  render(<Sidebar />);
  const messageElement = screen.getByText(/New Chat!/i);
  expect(messageElement).toBeInTheDocument();
});
