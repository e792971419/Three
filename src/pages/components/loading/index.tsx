import * as React from 'react';

export interface LoadingProps {

}

const Loading: React.SFC<LoadingProps> = () => {
    return (
        <>
            正在加载中...
        </>
    );
}

export default Loading;