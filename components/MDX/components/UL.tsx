import React, {ReactNode} from 'react';

const UL = ({children}: { children: ReactNode }) => {
    return (
        <ul className='mdxUl'>
            {children}
        </ul>
    );
};

export default UL;