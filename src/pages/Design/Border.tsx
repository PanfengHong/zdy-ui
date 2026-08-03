const DesignBorderPage = () => {
  const borderRadii = [
    { name: 'none', value: '0px' },
    { name: 'sm', value: '2px' },
    { name: 'base', value: '4px' },
    { name: 'md', value: '6px' },
    { name: 'lg', value: '8px' },
    { name: 'xl', value: '12px' },
    { name: 'full', value: '9999px' },
  ];

  return (
    <section className="component-section">
      <h2>边框</h2>
      <div className="design-content">
        <p>
          边框规范定义了元素的圆角和边框样式，为界面增添层次感和现代感。
        </p>

        <h3>圆角</h3>
        <div className="border-radius-showcase">
          {borderRadii.map((r) => (
            <div key={r.name} className="border-item">
              <div
                className="border-box"
                style={{
                  borderRadius: r.value,
                  border: '1px solid #d9d9d9',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#fafafa',
                }}
              ></div>
              <div className="border-info">
                <span className="border-name">{r.name}</span>
                <code>{r.value}</code>
              </div>
            </div>
          ))}
        </div>

        <h3>边框宽度</h3>
        <div className="border-width-showcase">
          <div className="border-width-item">
            <div style={{ border: '1px solid #d9d9d9', padding: '16px', borderRadius: '4px' }}>1px</div>
          </div>
          <div className="border-width-item">
            <div style={{ border: '2px solid #d9d9d9', padding: '16px', borderRadius: '4px' }}>2px</div>
          </div>
          <div className="border-width-item">
            <div style={{ border: '3px solid #d9d9d9', padding: '16px', borderRadius: '4px' }}>3px</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignBorderPage;
