import React, { useState, useRef } from 'react';

const FormExample = () => {
    const [inputValue, setInputValue] = useState('');

    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted value:', inputValue);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Controlled Input:
                    <input  type="text" value={inputValue} onChange={handleInputChange}  />
                </label>
                <button type="submit">Submit</button>
            </form>

            <br />

            <form onSubmit={handleSubmit}>
                <label>
                    Uncontrolled Input:
                    <input type="text" ref={inputRef} />
                </label>
                <button type="submit" onClick={focusInput}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormExample;
