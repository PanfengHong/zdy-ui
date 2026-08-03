const DesignShadowPage = () => {
  const shadows = [
    { name: 'xs', value: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)' },
    { name: 'sm', value: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)' },
    { name: 'md', value: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)' },
    { name: 'lg', value: '0 9px 28px 8px rgba(0, 0, 0, 0.05), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)' },
  ];

  return (
    <section className="component-section">
      <h2>阴影</h2>
      <div className="design-content">
        <p>
          阴影可以为界面元素增添深度和层次感，合理的阴影使用能够帮助用户理解页面结构。
        </p>

        <h3>阴影级别</h3>
        <div className="shadow-showcase">
          {shadows.map((s) => (
            <div key={s.name} className="shadow-item">
              <div
                className="shadow-box"
                style={{
                  boxShadow: s.value,
                  padding: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '160px',
                }}
              >
                <span className="shadow-name">{s.name}</span>
              </div>
              <code className="shadow-value">{s.value}</code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignShadowPage;
