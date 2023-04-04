import React from 'react';

const Form = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('event', event)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" datatest-id="email"/>
            <input type="password" datatest-id="password"/>
            <button type='submit'>submit</button>
        </form>
    );
};

export default Form;
