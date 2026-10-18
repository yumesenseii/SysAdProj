import React from 'react';
import { Search } from 'lucide-react';

export function DataTable({
  columns,
  data,
  keyField = 'id',
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search records...',
  filters = [],
  toolbarActions,
  emptyMessage = 'No matching records found.',
}) {
  return (
    <div className="admin-card">
      {(onSearchChange || filters.length > 0 || toolbarActions) && (
        <div className="table-toolbar">
          {onSearchChange ? (
            <div className="table-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          ) : <div />}

          <div className="table-filters">
            {filters.map((filter, index) => (
              <select
                key={index}
                className="table-select"
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
            {toolbarActions}
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width || 'auto' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: 'center', padding: '36px 20px', color: '#64748b' }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row[keyField]}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
