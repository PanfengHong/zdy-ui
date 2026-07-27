import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Upload from './Upload';

const UploadDemo = () => {
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
    </>
  );
};

export default UploadDemo;