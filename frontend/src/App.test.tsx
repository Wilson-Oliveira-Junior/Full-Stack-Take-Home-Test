import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders CSV Data Viewer header', () => {
  render(<App />);
  const headerElement = screen.getByText(/CSV Data Viewer/i);
  expect(headerElement).toBeInTheDocument();
});

test('can upload and display CSV data', async () => {
  render(<App />);

  // Simulate file upload
  const file = new File(
    ['name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'],
    'test.csv',
    { type: 'text/csv' }
  );
  const input = screen.getByLabelText(/upload csv/i);
  fireEvent.change(input, { target: { files: [file] } });

  // Check if data is displayed
  const item = await screen.findByText(/John Doe/i);
  expect(item).toBeInTheDocument();
});
