import React, { useId } from 'react'
const  Input = React.forwardRef((
    {
        label,
        type,
        name,
        value,
        placeholder,
        onChange,
        className = "",
        children,
        childrenClassName,
        ...props
    },
    ref,
) => {
    const Id = useId();
    return (
        <div className={`${className}`}>
            {label && <label htmlFor={Id}>{label}</label>}
            <div className={`${childrenClassName}`}>
                <input
                    id={Id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    ref={ref}
                    {...props}
                />
                {children}
            </div>
        </div>
    )
})
export default Input;