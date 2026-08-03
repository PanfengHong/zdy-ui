const DesignSpacingPage = () => {
  const spacingScale = [
    { name: 'xs', value: 4, token: '--space-xs' },
    { name: 'sm', value: 8, token: '--space-sm' },
    { name: 'md', value: 12, token: '--space-md' },
    { name: 'base', value: 16, token: '--space-base' },
    { name: 'lg', value: 20, token: '--space-lg' },
    { name: 'xl', value: 24, token: '--space-xl' },
    { name: '2xl', value: 32, token: '--space-2xl' },
    { name: '3xl', value: 48, token: '--space-3xl' },
  ];

  return (
    <section className="component-section">
      <h2>间距</h2>
      <div className="design-content">
        <p>
          间距是设计体系中控制元素之间距离的基础。统一的间距规范能够让界面看起来更加协调和专业。
        </p>

        <h3>间距标尺</h3>
        <div className="spacing-scale">
          {spacingScale.map((s) => (
            <div key={s.name} className="spacing-item">
              <div className="spacing-label">
                <span className="spacing-name">{s.name}</span>
                <span className="spacing-value">{s.value}px</span>
              </div>
              <div className="spacing-bar-container">
                <div
                  className="spacing-bar"
                  style={{ width: `${s.value * 4}px`, height: '12px', backgroundColor: '#1890ff', borderRadius: '2px' }}
                ></div>
              </div>
              <code>{s.token}</code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignSpacingPage;
