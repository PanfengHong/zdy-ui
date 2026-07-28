import React from 'react';
import classNames from 'classnames';
import Table from '../pc/Table';
import type { TableProps } from '../pc/Table/types';
import './ApiTable.less';

interface ApiTableProps extends Pick<TableProps, 'dataSource'> {
  className?: string;
  style?: React.CSSProperties;
};


const ApiTable: React.FC<ApiTableProps> = ({
  dataSource,
  className = '',
  style
}) => {
    const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

  return (
    <div className={classNames('zdy-api-api-table', className)} style={style}>
      <Table columns={apiColumns} dataSource={dataSource} />
    </div>
  );
};

export default ApiTable;