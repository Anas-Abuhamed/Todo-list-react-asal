const Button = ({ className, onClick, children, autoFocus }) => {
    return <button className={className} onClick={onClick} autoFocus={autoFocus}>{children}</button>
}
export default Button