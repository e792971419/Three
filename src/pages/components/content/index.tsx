import * as React from 'react';

export interface ContentProps {

}

const Content: React.SFC<ContentProps> = () => {
    return (
        <>
            <div>
                {'welcome'}
            </div>
        </>
    );
}

export default Content;