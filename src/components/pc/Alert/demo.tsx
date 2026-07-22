import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Alert from './Alert';

const AlertDemo = () => {
    return (
        <>
            <div className="component-group">
                <h3>基础示例</h3>
                <DemoBlock
                    code={`
<Alert>基础示例</Alert>
// 成功提示
<Alert type="success" title="操作成功" message="数据已保存" />

// 信息提示（可关闭）
<Alert type="info" title="提示" message="请先完成表单填写" closable />

// 警告提示（无图标）
<Alert type="warning" message="此操作将无法撤销" showIcon={false} />

// 错误提示（使用 children）
<Alert type="error">
  网络连接失败，请检查网络设置
</Alert>
          `.trim()}
                >
                    <div className="alert-group">
                        <Alert>基础示例</Alert>
                        
                        <Alert type="success" title="操作成功" />
                        
                        <Alert type="warning" message="此操作将无法撤销" />

                        <Alert type="error">
                            网络连接失败，请检查网络设置
                        </Alert>
                    </div>
                </DemoBlock>
            </div>
        </>
    );
};

export default AlertDemo;
