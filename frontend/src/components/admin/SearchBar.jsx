import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

export const SearchBar = ({ value, onChange, onClear, placeholder = 'Search records...' }) => {
  return (
    <div className="bf-search-bar">
      <Search size={16} className="bf-search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bf-search-input"
      />
      {value && (
        <button className="bf-search-clear" onClick={onClear} aria-label="Clear search">
          <X size={14} />
        </button>
      )}
    </div>
  );
};
