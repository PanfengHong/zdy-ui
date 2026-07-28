import React from 'react';
import classNames from 'classnames';

import './Table.less';

export interface TableColumn {
  title: string;
  dataIndex: string;
  width?: number | string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  dataSource: Record<string, any>[];
  className?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  className = '',
  style,
  bordered = true
}) => {
  return (
    <div className={classNames('zdy-table-wrapper', { 'zdy-table-wrapper--bordered': bordered }, className)} style={style}>
      <table className="zdy-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.dataIndex} style={col.width ? { width: col.width } : undefined}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.dataIndex}>
                  {col.render ? col.render(row[col.dataIndex], row, rowIndex) : row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;