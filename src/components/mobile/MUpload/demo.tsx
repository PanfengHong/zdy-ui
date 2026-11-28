/* eslint-disable react-refresh/only-export-components */
import { useRef, useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MUpload from './MUpload';
import type { MUploadFile } from './types';

const sampleImage = (text: string, from: string, to: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="240" height="240" fill="url(#g)"/><text x="120" y="128" font-family="sans-serif" font-size="26" fill="#fff" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const initialFiles: MUploadFile[] = [
  {
    uid: 'seed-1',
    name: '海景.jpg',
    url: sampleImage('海景', '#38bdf8', '#1d4ed8'),
    type: 'image/jpeg',
    size: 248 * 1024,
    status: 'done',
    percent: 100
  },
  {
    uid: 'seed-2',
    name: '城市.jpg',
    url: sampleImage('城市', '#fb7185', '#be185d'),
    type: 'image/jpeg',
    size: 512 * 1024,
    status: 'done',
    percent: 100
  }
];

const BasicDemo = () => {
  const [files, setFiles] = useState<MUploadFile[]>(initialFiles);

  return (
    <div className="mdemo-stack">
      <MUpload inline value={files} onChange={setFiles} />
      <p className="mdemo-tip">已选择 {files.length} 张，点击缩略图可全屏预览，右上角可移除。</p>
    </div>
  );
};

const UploadDemo = () => {
  const [files, setFiles] = useState<MUploadFile[]>([]);

  return (
    <div className="mdemo-stack">
      <MUpload
        inline
        value={files}
        onChange={setFiles}
        maxCount={6}
        upload={(file, onProgress) =>
          new Promise<void>(resolve => {
            let percent = 0;
            const timer = window.setInterval(() => {
              percent = Math.min(100, percent + 20);
              onProgress(percent);
              if (percent >= 100) {
                window.clearInterval(timer);
                resolve();
              }
            }, 240);
          })
        }
      />
      <p className="mdemo-tip">
        传入 upload 后选择文件即进入上传态，进度实时展示；返回地址可替换为真实接口的响应。
      </p>
    </div>
  );
};

const RetryDemo = () => {
  const uploadedRef = useRef(new Set<string>());

  return (
    <div className="mdemo-stack">
      <MUpload
        inline
        maxCount={3}
        upload={(file, onProgress) =>
          new Promise<void>((resolve, reject) => {
            // 首次上传模拟失败，重试时正常上传
            if (!uploadedRef.current.has(file.name)) {
              uploadedRef.current.add(file.name);
              window.setTimeout(() => reject(new Error('模拟网络异常')), 500);
              return;
            }

            let percent = 0;
            const timer = window.setInterval(() => {
              percent = Math.min(100, percent + 25);
              onProgress(percent);
              if (percent >= 100) {
                window.clearInterval(timer);
                resolve();
              }
            }, 200);
          })
        }
      />
      <p className="mdemo-tip">首次上传会模拟失败，点击缩略图上的「重试」即可重新上传。</p>
    </div>
  );
};

const EventDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const pushLog = (text: string) => setLogs(prev => [text, ...prev].slice(0, 4));

  return (
    <div className="mdemo-stack">
      <MUpload
        inline
        maxCount={3}
        maxFileSize={8 * 1024 * 1024}
        beforeUpload={file => file.size <= 5 * 1024 * 1024}
        upload={(file, onProgress) =>
          new Promise<void>((resolve, reject) => {
            let percent = 0;
            const timer = window.setInterval(() => {
              percent = Math.min(100, percent + 25);
              onProgress(percent);
              if (percent >= 100) {
                window.clearInterval(timer);
                // 大于 1MB 时模拟服务端拒绝，便于观察 onError
                if (file.size > 1024 * 1024) {
                  reject(new Error('文件过大，服务端拒绝'));
                } else {
                  resolve();
                }
              }
            }, 220);
          })
        }
        onProgress={(percent, file) => pushLog(`onProgress · ${file.name} ${percent}%`)}
        onSuccess={(response, file) => pushLog(`onSuccess · ${file.name}`)}
        onError={(error, file) => pushLog(`onError · ${file.name}（${error.message}）`)}
      />
      <div className="mdemo-tip" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {logs.length === 0
          ? '上传后会在这里输出事件回调。'
          : logs.map(log => <span key={log}>{log}</span>)}
      </div>
      <p className="mdemo-tip">
        超过 5MB 的文件会被 beforeUpload 拦截；1-5MB 的文件模拟上传失败，可观察 onError。
      </p>
    </div>
  );
};

const LimitDemo = () => (
  <div className="mdemo-stack">
    <MUpload
      inline
      maxCount={3}
      maxFileSize={2 * 1024 * 1024}
      tip="最多 3 张，单张不超过 2MB"
    />
    <p className="mdemo-tip">超出数量或大小时会被拦截，并在底部显示提示文案。</p>
  </div>
);

const FileDemo = () => (
  <div className="mdemo-stack">
    <MUpload
      inline
      accept=".pdf,.doc,.docx"
      multiple={false}
      maxFileSize={20 * 1024 * 1024}
      defaultValue={[
        {
          uid: 'seed-pdf',
          name: '产品需求文档.pdf',
          type: 'application/pdf',
          size: 3.2 * 1024 * 1024,
          status: 'done',
          percent: 100
        }
      ]}
      tip="支持 PDF、Word，单个不超过 20MB"
    />
    <p className="mdemo-tip">非图片文件以扩展名占位展示，点击不会打开图片预览。</p>
  </div>
);

const DisabledDemo = () => (
  <div className="mdemo-stack">
    <MUpload inline disabled defaultValue={initialFiles} />
    <p className="mdemo-tip">disabled 时不可添加、不可移除，缩略图仍可预览。</p>
  </div>
);

const mUploadDemo: DemoConfig = {
  intro:
    '移动端上传以九宫格缩略图展示已选文件，点击加号从相册或相机选择，支持数量与大小限制、自定义上传进度、失败重试、移除与全屏预览；上传事件与 Upload 一致，提供 beforeUpload / onProgress / onSuccess / onError。',
  demos: [
    {
      title: '基础用法',
      desc: '默认按图片上传，选择后生成本地预览；value 受控、onChange 返回最新文件列表。',
      code: `const [files, setFiles] = useState<MUploadFile[]>(initialFiles);

<MUpload value={files} onChange={setFiles} />`,
      render: <BasicDemo />
    },
    {
      title: '自定义上传与进度',
      desc: 'upload 接收文件与进度回调并返回可访问地址；完成后用返回地址替换本地预览。',
      code: `<MUpload
  maxCount={6}
  upload={(file, onProgress) =>
    new Promise(resolve => {
      let percent = 0;
      const timer = setInterval(() => {
        percent = Math.min(100, percent + 20);
        onProgress(percent);
        if (percent >= 100) {
          clearInterval(timer);
          resolve();
        }
      }, 240);
    })
  }
/>`,
      render: <UploadDemo />
    },
    {
      title: '上传事件',
      desc: '与 Upload 一致的生命周期回调：beforeUpload 拦截、onProgress 进度、onSuccess 成功、onError 失败。',
      code: `<MUpload
  beforeUpload={file => file.size <= 5 * 1024 * 1024}
  upload={(file, onProgress) => requestUpload(file, onProgress)}
  onProgress={(percent, file) => console.log('进度', percent, file.name)}
  onSuccess={(response, file) => console.log('成功', response, file.name)}
  onError={(error, file) => console.log('失败', error, file.name)}
/>`,
      render: <EventDemo />
    },
    {
      title: '失败与重试',
      desc: 'upload 返回 rejected 时文件标记为失败，缩略图上出现「重试」入口，重新调用 upload 即可。',
      code: `<MUpload
  upload={(file, onProgress) =>
    new Promise((resolve, reject) => {
      requestUpload(file, onProgress).then(resolve, reject);
    })
  }
/>`,
      render: <RetryDemo />
    },
    {
      title: '数量与大小限制',
      desc: 'maxCount 控制最多文件数，maxFileSize 控制单文件大小（字节，与 Upload 一致），超限时触发 onExceed 并提示。',
      code: `<MUpload
  maxCount={3}
  maxFileSize={2 * 1024 * 1024}
  tip="最多 3 张，单张不超过 2MB"
/>`,
      render: <LimitDemo />
    },
    {
      title: '非图片文件',
      desc: '通过 accept 指定类型，非图片文件以扩展名与大小占位展示；multiple={false} 限制单选。',
      code: `<MUpload
  accept=".pdf,.doc,.docx"
  multiple={false}
  maxFileSize={20 * 1024 * 1024}
  defaultValue={[
    { uid: '1', name: '产品需求文档.pdf', type: 'application/pdf', size: 3355443 }
  ]}
/>`,
      render: <FileDemo />
    },
    {
      title: '禁用状态',
      desc: 'disabled 时隐藏添加与移除入口，仅保留预览能力。',
      code: `<MUpload disabled defaultValue={files} />`,
      render: <DisabledDemo />
    }
  ],
  api: [
    { prop: 'value', desc: '文件列表（受控）', type: 'MUploadFile[]', default: '-' },
    { prop: 'defaultValue', desc: '默认文件列表（非受控）', type: 'MUploadFile[]', default: '[]' },
    { prop: 'onChange', desc: '文件列表变化回调', type: '(files: MUploadFile[]) => void', default: '-' },
    {
      prop: 'upload',
      desc: '自定义上传，返回文件地址；不传时仅生成本地预览',
      type: '(file: File, onProgress) => Promise<string | void>',
      default: '-'
    },
    { prop: 'accept', desc: '可选文件类型', type: 'string', default: "'image/*'" },
    { prop: 'multiple', desc: '是否允许多选', type: 'boolean', default: 'true' },
    { prop: 'maxCount', desc: '最多上传数量', type: 'number', default: '9' },
    { prop: 'maxFileSize', desc: '单文件大小上限（字节）', type: 'number', default: '10 * 1024 * 1024' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'preview', desc: '点击缩略图是否全屏预览', type: 'boolean', default: 'true' },
    { prop: 'inline', desc: '预览层内联渲染，用于手机预览等受限容器', type: 'boolean', default: 'false' },
    { prop: 'capture', desc: '直接调起前置/后置摄像头', type: "'user' | 'environment'", default: '-' },
    { prop: 'tip', desc: '底部提示文案', type: 'ReactNode', default: '按限制自动生成' },
    {
      prop: 'beforeUpload',
      desc: '上传前校验，返回 false 或 rejected 时跳过该文件',
      type: '(file: File) => boolean | Promise<boolean>',
      default: '-'
    },
    { prop: 'onProgress', desc: '上传进度回调', type: '(percent, file) => void', default: '-' },
    { prop: 'onSuccess', desc: '上传成功回调，response 为 upload 的返回值', type: '(response, file) => void', default: '-' },
    { prop: 'onError', desc: '上传失败回调', type: '(error, file) => void', default: '-' },
    { prop: 'onExceed', desc: '数量或大小超限回调', type: '(files: File[]) => void', default: '-' },
    { prop: 'onPreview', desc: '点击缩略图回调', type: '(file, index) => void', default: '-' },
    { prop: 'onRemove', desc: '移除文件回调', type: '(file: MUploadFile) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mUploadDemo;
