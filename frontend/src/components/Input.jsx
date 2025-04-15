import React from 'react'

const Input = ({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
    required
}) => {
    const [focus, setFocus] = React.useState(false)
    const isFocused = focus || value

    return (
        <div>

            <div
                className={`relative  rounded-md p-3 bg-gray-100 transition-all duration-300 shadow-md
                    ${focus ? 'ring-2 ring-blue-500 shadow-md' : 'ring-1 ring-gray-300'} 
                    ${error ? 'ring-red-500' : ''}`}
            >
                <label
                    htmlFor={label}
                    className={`absolute left-1 px-1 transition-all duration-300 pointer-events-none 
                        bg-gray-100 rounded-sm 
                        ${isFocused ? '-top-3 text-xs text-blue-600 scale-90' : 'top-4 text-gray-600'}`}
                    style={{ transformOrigin: 'left' }}
                >
                    {placeholder}
                </label>
                <input
                    type={type}
                    name={name}
                    id={label}
                    className="bg-transparent w-full outline-none text-sm mt-1"
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    required={type === 'email' || type === 'tel' ? true : required}
                />
            </div>
            {error && type !== 'tel' && type !== 'text' && (
                <span className="text-red-500 text-sm mt-1 animate-fadeIn">
                    {error}
                </span>
            )}
        </div>
    )
}

export default Input
