import React from 'react';

const Spinner = (): JSX.Element => {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-blue"></div>
        </div>
    );
};

export default Spinner;


