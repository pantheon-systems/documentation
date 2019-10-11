import React from 'react';
import './index.css';

const Switch = ({
    isOn,
    handleToggle,
    onColor = '#06D6A0',
    slug = 'react-switch',
    text = '',
    required = false
}) => {
    return (
        <div className='react-switch-wrap row form-group' id={`${slug}-wrap`}>
            <input
                required={required}
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={slug}
                type="checkbox"
            />
            <label
                style={isOn ? { background: onColor } : {}}
                className="react-switch-label form-label"
                htmlFor={slug}
            >
                <span className={`react-switch-button`} />
            </label>
            <span className='switch-text'>{text}</span>
        </div>
    );
};

export default Switch;