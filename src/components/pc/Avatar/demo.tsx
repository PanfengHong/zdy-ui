import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Avatar from './Avatar';

// 使用 picsum 提供占位头像
const avatarUrl = (seed: string) => `https://i.pravatar.cc/100?u=${seed}`;

const AvatarDemo = () => {
  const apiData = [
    { prop: 'src', desc: '图片地址', type: 'string', default: '-' },
    { prop: 'srcSet', desc: '图片 srcset', type: 'string', default: '-' },
    { prop: 'alt', desc: '图片 alt 文本', type: 'string', default: '-' },
    { prop: 'icon', desc: '自定义图标（无图片时展示）', type: 'ReactNode', default: '-' },
    { prop: 'text', desc: '文字内容（无图片时展示）', type: 'ReactNode', default: '-' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large' | number", default: "'medium'" },
    { prop: 'shape', desc: '形状', type: "'circle' | 'square'", default: "'circle'" },
    { prop: 'status', desc: '状态点', type: "'online' | 'busy' | 'away' | 'offline'", default: '-' },
    { prop: 'statusColor', desc: '自定义状态点颜色', type: 'string', default: '-' },
    { prop: 'gap', desc: '文字与背景的间距比例', type: 'number', default: '4' },
    { prop: 'onError', desc: '图片加载失败回调，返回 false 阻止默认回退', type: '() => boolean', default: '-' },
    { prop: 'onClick', desc: '点击回调', type: '(e) => void', default: '-' },
  ];

  const groupApiData = [
    { prop: 'maxCount', desc: '最大显示数量', type: 'number', default: '-' },
    { prop: 'maxStyle', desc: '超出计数头像样式', type: 'CSSProperties', default: '-' },
    { prop: 'size', desc: '组内头像尺寸', type: "'small' | 'medium' | 'large' | number", default: "'medium'" },
    { prop: 'shape', desc: '组内头像形状', type: "'circle' | 'square'", default: "'circle'" },
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock code={`<Avatar src="https://i.pravatar.cc/100?u=1" />\n<Avatar text="U" />\n<Avatar text="张" />\n<Avatar icon="👤" />`}>
          <Avatar src={avatarUrl('1')} />
          <Avatar text="U" />
          <Avatar text="张" />
          <Avatar icon="👤" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不同尺寸</h3>
        <DemoBlock code={`<Avatar size="small" text="S" />\n<Avatar size="medium" text="M" />\n<Avatar size="large" text="L" />\n<Avatar size={64} text="64" />`}>
          <Avatar size="small" text="S" />
          <Avatar size="medium" text="M" />
          <Avatar size="large" text="L" />
          <Avatar size={64} text="64" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不同形状</h3>
        <DemoBlock code={`<Avatar shape="circle" text="C" />\n<Avatar shape="square" text="S" />`}>
          <Avatar shape="circle" text="C" />
          <Avatar shape="square" text="S" />
          <Avatar shape="circle" src={avatarUrl('2')} />
          <Avatar shape="square" src={avatarUrl('3')} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>文字头像</h3>
        <DemoBlock code={`<Avatar text="A" />\n<Avatar text="张三" />\n<Avatar text="Hello" />\n<Avatar text="王" style={{ backgroundColor: '#f56a00' }} />`}>
          <Avatar text="A" />
          <Avatar text="张三" />
          <Avatar text="Hello" />
          <Avatar text="王" style={{ backgroundColor: '#f56a00' }} />
          <Avatar text="李" style={{ backgroundColor: '#87d068' }} />
          <Avatar text="赵" style={{ backgroundColor: '#00a2ae' }} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>图标头像</h3>
        <DemoBlock code={`<Avatar icon="👤" style={{ backgroundColor: '#87d068' }} />\n<Avatar icon="👨" style={{ backgroundColor: '#f56a00' }} />`}>
          <Avatar icon="👤" style={{ backgroundColor: '#87d068' }} />
          <Avatar icon="👨" style={{ backgroundColor: '#f56a00' }} />
          <Avatar icon="👩" style={{ backgroundColor: '#fde0dc' }} />
          <Avatar icon="🧑" style={{ backgroundColor: '#00a2ae' }} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>状态点</h3>
        <DemoBlock code={`<Avatar src="..." status="online" />\n<Avatar text="A" status="busy" />`}>
          <Avatar src={avatarUrl('4')} status="online" />
          <Avatar src={avatarUrl('5')} status="busy" />
          <Avatar src={avatarUrl('6')} status="away" />
          <Avatar src={avatarUrl('7')} status="offline" />
          <Avatar text="A" status="online" />
          <Avatar text="B" status="busy" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义状态点颜色</h3>
        <DemoBlock code={`<Avatar text="A" status="online" statusColor="#722ed1" />`}>
          <Avatar text="A" status="online" statusColor="#722ed1" />
          <Avatar text="B" status="busy" statusColor="#13c2c2" />
          <Avatar src={avatarUrl('8')} status="online" statusColor="#eb2f96" />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>图片加载失败回退</h3>
        <DemoBlock code={`<Avatar src="broken-url" text="Fallback" />`}>
          <Avatar src="https://broken-url.example.com/avatar.png" text="FB" />
          <Avatar src="https://broken-url.example.com/avatar.png" text="张" />
          <Avatar src="https://broken-url.example.com/avatar.png" icon="👤" />
          <Avatar
            src="https://broken-url.example.com/avatar.png"
            onError={() => { console.log('图片加载失败'); return false; }}
            text="自定义"
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>可点击头像</h3>
        <DemoBlock code={`<Avatar text="A" onClick={(e) => console.log('点击', e)} />`}>
          <Avatar
            text="点"
            onClick={() => alert('头像被点击了！')}
            style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
          />
          <Avatar
            src={avatarUrl('9')}
            onClick={() => alert('头像被点击了！')}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>头像组（Avatar.Group）</h3>
        <DemoBlock code={`<Avatar.Group>\n  <Avatar src="..." />\n  <Avatar text="A" />\n  <Avatar text="B" />\n</Avatar.Group>`}>
          <Avatar.Group>
            <Avatar src={avatarUrl('10')} />
            <Avatar text="A" style={{ backgroundColor: '#f56a00' }} />
            <Avatar text="B" style={{ backgroundColor: '#87d068' }} />
            <Avatar text="C" style={{ backgroundColor: '#00a2ae' }} />
          </Avatar.Group>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>头像组 - 最大数量限制</h3>
        <DemoBlock code={`<Avatar.Group maxCount={3}>\n  <Avatar src="..." />\n  ...\n</Avatar.Group>`}>
          <Avatar.Group maxCount={3}>
            <Avatar src={avatarUrl('11')} />
            <Avatar src={avatarUrl('12')} />
            <Avatar src={avatarUrl('13')} />
            <Avatar src={avatarUrl('14')} />
            <Avatar src={avatarUrl('15')} />
            <Avatar src={avatarUrl('16')} />
          </Avatar.Group>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>头像组 - 统一尺寸与形状</h3>
        <DemoBlock code={`<Avatar.Group size="large" shape="square">\n  ...\n</Avatar.Group>`}>
          <Avatar.Group size="large" shape="square">
            <Avatar text="甲" style={{ backgroundColor: '#f56a00' }} />
            <Avatar text="乙" style={{ backgroundColor: '#87d068' }} />
            <Avatar text="丙" style={{ backgroundColor: '#00a2ae' }} />
            <Avatar text="丁" style={{ backgroundColor: '#722ed1' }} />
          </Avatar.Group>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>头像组 - 自定义超出样式</h3>
        <DemoBlock code={`<Avatar.Group maxCount={2} maxStyle={{ backgroundColor: '#1890ff', color: '#fff' }}>`}>
          <Avatar.Group
            maxCount={2}
            maxStyle={{ backgroundColor: '#1890ff', color: '#fff' }}
          >
            <Avatar src={avatarUrl('17')} />
            <Avatar src={avatarUrl('18')} />
            <Avatar src={avatarUrl('19')} />
            <Avatar src={avatarUrl('20')} />
            <Avatar src={avatarUrl('21')} />
          </Avatar.Group>
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Avatar API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>Avatar.Group API</h3>
        <ApiTable dataSource={groupApiData} />
      </div>
    </>
  );
};

export default AvatarDemo;
