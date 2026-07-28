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

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Upload action="/api/upload" />
          `.trim()}
        >
          <Upload action="/api/upload" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>限制文件类型</h3>
        <DemoBlock
          code={`
<Upload action="/api/upload" accept=".jpg,.png,.gif" />
          `.trim()}
        >
          <Upload action="/api/upload" accept=".jpg,.png,.gif" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>限制文件大小（2MB）</h3>
        <DemoBlock
          code={`
<Upload action="/api/upload" maxFileSize={2 * 1024 * 1024} />
          `.trim()}
        >
          <Upload action="/api/upload" maxFileSize={2 * 1024 * 1024} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>限制上传数量</h3>
        <DemoBlock
          code={`
<Upload action="/api/upload" maxCount={3} />
          `.trim()}
        >
          <Upload action="/api/upload" maxCount={3} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用状态</h3>
        <DemoBlock
          code={`
<Upload action="/api/upload" disabled />
          `.trim()}
        >
          <Upload action="/api/upload" disabled />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义回调</h3>
        <DemoBlock
          code={`
<Upload 
  action="/api/upload"
  onProgress={(percent, file) => console.log('进度:', percent, file)}
  onSuccess={(response, file) => console.log('成功:', response, file)}
  onError={(error, file) => console.log('失败:', error, file)}
  onChange={(fileList) => console.log('文件列表:', fileList)}
  onRemove={(file) => console.log('移除:', file)}
/>
          `.trim()}
        >
          <Upload 
            action="/api/upload"
            onProgress={(percent, file) => console.log('进度:', percent, file)}
            onSuccess={(response, file) => console.log('成功:', response, file)}
            onError={(error, file) => console.log('失败:', error, file)}
            onChange={(fileList) => console.log('文件列表:', fileList)}
            onRemove={(file) => console.log('移除:', file)}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>上传前校验</h3>
        <DemoBlock
          code={`
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
          `.trim()}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不显示上传列表</h3>
        <DemoBlock
          code={`
<Upload action="/api/upload" showUploadList={false} />
          `.trim()}
        >
          <Upload action="/api/upload" showUploadList={false} />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default UploadDemo;