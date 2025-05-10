// front/src/components/SearchBar.js
import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <InputGroup>
      <FormControl
        placeholder="Enter query..."
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch()}
      />
      <Button onClick={onSearch}>Search</Button>
    </InputGroup>
  );
}