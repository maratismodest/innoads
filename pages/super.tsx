import React from 'react'

export default function Super() {
    return (
        <div>
            <button onClick={() => localStorage.setItem('token', `${process.env.NEXT_PUBLIC_TEST_TOKEN}`)}>token
            </button>
        </div>
    )
};
