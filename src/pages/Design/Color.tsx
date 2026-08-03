const DesignColorPage = () => {
  const primaryColors = [
    { name: 'Primary', color: '#1890ff' },
    { name: 'Success', color: '#52c41a' },
    { name: 'Warning', color: '#faad14' },
    { name: 'Error', color: '#ff4d4f' },
    { name: 'Info', color: '#1890ff' },
  ];

  const neutralColors = [
    { name: 'Text Primary', color: 'rgba(0, 0, 0, 0.85)' },
    { name: 'Text Secondary', color: 'rgba(0, 0, 0, 0.65)' },
    { name: 'Text Disabled', color: 'rgba(0, 0, 0, 0.25)' },
    { name: 'Border', color: '#d9d9d9' },
    { name: 'Background', color: '#f5f5f5' },
    { name: 'Surface', color: '#ffffff' },
  ];

  const paletteColors = [
    '#1890ff', '#40a9ff', '#69c0ff', '#91caff', '#bae0ff', '#e6f4ff', '#f0f5ff',
    '#52c41a', '#73d13d', '#95de64', '#b7eb8f', '#d9f7be', '#f6ffed',
    '#faad14', '#ffc53d', '#ffd666', '#ffe58f', '#fff1b8', '#fffbe6',
    '#ff4d4f', '#ff7875', '#ffa39e', '#ffccc7', '#ffe2e0', '#fff1f0',
  ];

  return (
    <section className="component-section">
      <h2>色彩</h2>
      <div className="design-content">
        <p>
          色彩是设计体系中最核心的部分之一。合理的色彩搭配能够营造氛围、传递信息、引导用户操作。
        </p>

        <h3>功能色</h3>
        <div className="color-grid">
          {primaryColors.map((c) => (
            <div key={c.name} className="color-card">
              <div className="color-swatch" style={{ backgroundColor: c.color }}></div>
              <div className="color-info">
                <div className="color-name">{c.name}</div>
                <div className="color-value">{c.color}</div>
              </div>
            </div>
          ))}
        </div>

        <h3>中性色</h3>
        <div className="color-grid">
          {neutralColors.map((c) => (
            <div key={c.name} className="color-card">
              <div
                className="color-swatch"
                style={{
                  backgroundColor: c.color,
                  border: c.color === 'transparent' || c.color.startsWith('#fff') ? '1px solid #e8e8e8' : 'none',
                }}
              ></div>
              <div className="color-info">
                <div className="color-name">{c.name}</div>
                <div className="color-value">{c.color}</div>
              </div>
            </div>
          ))}
        </div>

        <h3>色板</h3>
        <div className="color-palette">
          {paletteColors.map((c, i) => (
            <div
              key={i}
              className="palette-cell"
              style={{ backgroundColor: c }}
              title={c}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignColorPage;
