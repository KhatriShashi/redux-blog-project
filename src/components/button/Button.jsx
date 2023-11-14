import React from 'react'

const Button = React.forwardRef(
    (
        {   
            btnName="Button",
            children,
            onClick,
            type = 'button',
            className = '',
            ...props },
            ref
    ) => (
        <button
            onClick={onClick}
            type={type}
            className={className}
            ref={ref}
            {...props}>
            {children}{btnName}</button>
    ))
export default Button