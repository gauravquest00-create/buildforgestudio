import React from 'react';
import './DataTable.css';

export const DataTable = ({ columns, data, keyField = '_id', emptyMessage = 'No records found.' }) => {
  if (!data || data.length === 0) {
    return <div className="bf-table-empty">{emptyMessage}</div>;
  }

  return (
    <div className="bf-table-wrapper">
      <table className="bf-data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={{ width: col.width || 'auto', textAlign: col.align || 'left' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[keyField]}>
              {columns.map((col, idx) => (
                <td key={idx} style={{ textAlign: col.align || 'left' }}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
