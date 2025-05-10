// front/src/components/SortDropdown.js

import React from 'react';
import { Form } from 'react-bootstrap';

const options = [
  { label: 'Newest to Oldest', value: 'desc' },
  { label: 'Oldest to Newest', value: 'asc' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <Form.Group controlId="sortOrder">
      <Form.Label>Order by:</Form.Label>
      <Form.Select
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
