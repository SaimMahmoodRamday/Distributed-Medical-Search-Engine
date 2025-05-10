// front/src/components/Filters.js
import React from 'react';
import { Form } from 'react-bootstrap';

const options = [
  { label: 'All', value: 'all' },
  { label: 'Title', value: 'title' },
  { label: 'Abstract', value: 'abstract' },
  { label: 'Keywords', value: 'keywords' },
];

export default function Filters({ value, onChange }) {
  return (
    <Form>
      <Form.Label>Search in:</Form.Label>
      <div>
        {options.map(opt => (
          <Form.Check
            inline
            key={opt.value}
            type="radio"
            label={opt.label}
            name="filter"
            id={`filter-${opt.value}`}
            value={opt.value}
            checked={value === opt.value}
            onChange={e => onChange(e.target.value)}
          />
        ))}
      </div>
    </Form>
  );
}
