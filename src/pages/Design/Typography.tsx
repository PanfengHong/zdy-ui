const DesignTypographyPage = () => {
  return (
    <section className="component-section">
      <h2>字体</h2>
      <div className="design-content">
        <p>
          字体规范定义了文字的字号、字重、行高和字间距，确保界面文字的层次感和可读性。
        </p>

        <h3>字体家族</h3>
        <div className="font-family-list">
          <div className="font-family-item">
            <span className="font-family-label">默认字体</span>
            <code>
              -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
            </code>
          </div>
        </div>

        <h3>字号</h3>
        <div className="typography-scale">
          <div className="type-scale-item">
            <span className="type-scale-name">标题 H1</span>
            <span className="type-scale-sample" style={{ fontSize: '38px', fontWeight: 600 }}>Aa 标题文字</span>
            <code>38px / 600</code>
          </div>
          <div className="type-scale-item">
            <span className="type-scale-name">标题 H2</span>
            <span className="type-scale-sample" style={{ fontSize: '30px', fontWeight: 600 }}>Aa 标题文字</span>
            <code>30px / 600</code>
          </div>
          <div className="type-scale-item">
            <span className="type-scale-name">标题 H3</span>
            <span className="type-scale-sample" style={{ fontSize: '24px', fontWeight: 600 }}>Aa 标题文字</span>
            <code>24px / 600</code>
          </div>
          <div className="type-scale-item">
            <span className="type-scale-name">标题 H4</span>
            <span className="type-scale-sample" style={{ fontSize: '20px', fontWeight: 600 }}>Aa 标题文字</span>
            <code>20px / 600</code>
          </div>
          <div className="type-scale-item">
            <span className="type-scale-name">正文</span>
            <span className="type-scale-sample" style={{ fontSize: '14px', fontWeight: 400 }}>Aa 正文文字</span>
            <code>14px / 400</code>
          </div>
          <div className="type-scale-item">
            <span className="type-scale-name">辅助文字</span>
            <span className="type-scale-sample" style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(0,0,0,0.65)' }}>Aa 辅助文字</span>
            <code>12px / 400</code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignTypographyPage;
