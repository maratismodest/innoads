import React from 'react';

const Spinner = (): JSX.Element => {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="w-16 h-16 border-b-2 border-blue rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;


