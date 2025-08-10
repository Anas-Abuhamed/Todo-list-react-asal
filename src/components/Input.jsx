const Input = ({ type, className = "", id = "", placeholder = "", focus = false, value = "", setValue, keyDown }) => {
    return <input type={type} className={className} id={id} placeholder={placeholder} autoFocus={focus} value={value} onChange={e => setValue(e.target.value)} onKeyDown={keyDown} />
}

export default Input;