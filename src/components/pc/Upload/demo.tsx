import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Upload from './Upload';

const UploadDemo = () => {
  const apiData = [
    { prop: 'action', desc: '上传接口地址', type: 'string', default: '-' },
    { prop: 'method', desc: '请求方法', type: "'post' | 'get'", default: 'post' },
    { prop: 'headers', desc: '请求头', type: 'object', default: '-' },
    { prop: 'data', desc: '附加数据', type: 'object', default: '-' },
    { prop: 'accept', desc: '接受的文件类型', type: 'string', default: '-' },
    { prop: 'multiple', desc: '是否支持多选', type: 'boolean', default: 'false' },
    { prop: 'maxFileSize', desc: '最大文件大小（字节）', type: 'number', default: '-' },
    { prop: 'maxCount', desc: '最大上传数量', type: 'number', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'showUploadList', desc: '是否显示上传列表', type: 'boolean', default: 'true' },
    { prop: 'beforeUpload', desc: '上传前校验', type: 'function(file)', default: '-' },
    { prop: 'onProgress', desc: '上传进度回调', type: 'function(percent, file)', default: '-' },
    { prop: 'onSuccess', desc: '上传成功回调', type: 'function(response, file)', default: '-' },
    { prop: 'onError', desc: '上传失败回调', type: 'function(error, file)', default: '-' },
    { prop: 'onChange', desc: '文件列表变化回调', type: 'function(fileList)', default: '-' },
    { prop: 'onRemove', desc: '移除文件回调', type: 'function(file)', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const demos = [
    {
      title: '基础示例',
      code: `<Upload action="/api/upload" />`,
      render: <Upload action="/api/upload" />,
    },
    {
      title: '限制文件类型',
      code: `<Upload action="/api/upload" accept=".jpg,.png,.gif" />`,
      render: <Upload action="/api/upload" accept=".jpg,.png,.gif" />,
    },
    {
      title: '限制文件大小（2MB）',
      code: `<Upload action="/api/upload" maxFileSize={2 * 1024 * 1024} />`,
      render: <Upload action="/api/upload" maxFileSize={2 * 1024 * 1024} />,
    },
    {
      title: '限制上传数量',
      code: `<Upload action="/api/upload" maxCount={3} />`,
      render: <Upload action="/api/upload" maxCount={3} />,
    },
    {
      title: '禁用状态',
      code: `<Upload action="/api/upload" disabled />`,
      render: <Upload action="/api/upload" disabled />,
    },
    {
      title: '自定义回调',
      code: `<Upload \n  action="/api/upload"\n  onProgress={(percent, file) => console.log('进度:', percent, file)}\n  onSuccess={(response, file) => console.log('成功:', response, file)}\n  onError={(error, file) => console.log('失败:', error, file)}\n  onChange={(fileList) => console.log('文件列表:', fileList)}\n  onRemove={(file) => console.log('移除:', file)}\n/>`,
      render: (
        <Upload
          action="/api/upload"
          onProgress={(percent, file) => console.log('进度:', percent, file)}
          onSuccess={(response, file) => console.log('成功:', response, file)}
          onError={(error, file) => console.log('失败:', error, file)}
          onChange={(fileList) => console.log('文件列表:', fileList)}
          onRemove={(file) => console.log('移除:', file)}
        />
      ),
    },
    {
      title: '上传前校验',
      code: `<Upload \n  action="/api/upload"\n  beforeUpload={(file) => {\n    if (file.size > 5 * 1024 * 1024) {\n      alert('文件大小不能超过 5MB');\n      return false;\n    }\n    return true;\n  }}\n/>`,
      render: (
        <Upload
          action="/api/upload"
          beforeUpload={(file) => {
            if (file.size > 5 * 1024 * 1024) {
              alert('文件大小不能超过 5MB');
              return false;
            }
            return true;
          }}
        />
      ),
    },
    {
      title: '不显示上传列表',
      code: `<Upload action="/api/upload" showUploadList={false} />`,
      render: <Upload action="/api/upload" showUploadList={false} />,
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default UploadDemo;
