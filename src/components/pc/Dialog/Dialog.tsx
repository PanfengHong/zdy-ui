import classNames from 'classnames';
import type { BaseDialogProps } from './types';
import Icon from '../Icon';

import './Dialog.less';

const Dialog = ({
  visible = false,
  title,
  width = 520,
  closable = true,
  mask = true,
  maskClosable = true,
  onClose,
  footer,
  children,
  className,
  style
}: BaseDialogProps) => {
  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && maskClosable && onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <>
      {visible && mask && (
        <div className="zdy-dialog-mask" onClick={handleMaskClick} />
      )}
      {visible && (
        <div className="zdy-dialog-wrap">
          <div
            className={classNames('zdy-dialog', className)}
            style={{ ...style, width: widthStyle }}
          >
            <div className="zdy-dialog-header">
              {title && <div className="zdy-dialog-title">{title}</div>}
              {closable && (
                <button className="zdy-dialog-close" onClick={handleClose}>
                  <Icon type="close" size={16} />
                </button>
              )}
            </div>
            <div className="zdy-dialog-body">
              {children}
            </div>
            {footer && (
              <div className="zdy-dialog-footer">
                {footer}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
