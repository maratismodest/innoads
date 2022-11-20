import React from 'react';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzEyMzM0ODAsInVzZXJuYW1lIjoibWFyYXRmYWl6ZXIiLCJpYXQiOjE2Njg4ODY2MDUsImV4cCI6MTcwMDQyMjYwNX0.8xAkTGPqK-6eK4ctY8LI2l4nXMfkj7g1jUGzVZ5ebu8"
const Super = () => {
    return (
        <div>
            <button onClick={() => localStorage.setItem('token', token)}>token</button>
        </div>
    );
};

export default Super;