import React from 'react';
import './FilterBar.css';

export const FilterBar = ({ options = [], activeValue, onSelect }) => {
  return (
    <div className="bf-admin-filter-bar">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`bf-admin-filter-pill ${activeValue === opt.value ? 'is-active' : ''}`}
          onClick={() => onSelect(opt.value)}
        >
          {opt.label} {opt.count !== undefined && <span className="bf-filter-cnt">{opt.count}</span>}
        </button>
      ))}
    </div>
  );
};
