// front/src/components/PaginationControl.js
import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationControl({ current, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  const items = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - current) < 3) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === current}
          onClick={() => onChange(i)}
        >{i}</Pagination.Item>
      );
    } else if (
      items[items.length - 1] !== 'ellipsis' &&
      (i === current - 3 || i === current + 3)
    ) {
      items.push(<Pagination.Ellipsis key={`e${i}`} disabled />);
    }
  }
  return <Pagination>{items}</Pagination>;
}