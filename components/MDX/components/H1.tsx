import React, {ReactNode} from 'react';

const H1 = ({children}: { children: ReactNode }) => {
    return (
        <h1 className='mdxH1'>
            {children}
        </h1>
    );
};

export default H1;