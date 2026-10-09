/** Icon rendering is outside the selector behavior under test. */
import {forwardRef, type InputHTMLAttributes} from 'react'
import {createPortal} from 'react-dom'
export const IconCheckOutlineRegular = () => <span />
export const IconChevronDownOutlineRegular = () => <span />
export const IconChevronRightOutlineRegular = () => <span />
export const IconWarningOutlineRegular = () => <span />
export const Toast = ({ text }) => <div role="alert">{text}</div>

export const MenuSurface = ({children, ...props}) => <div {...props}>{children}</div>
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => <input {...props} ref={ref}/> )
export const Modal = ({open, title, closeLabel, onClose, className, contentClassName, children}) => open ? createPortal(<div role="dialog" aria-label={title} className={className}><button aria-label={closeLabel} onClick={onClose}>×</button><div className={contentClassName}>{children}</div></div>, document.body) : null
