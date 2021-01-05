// @flow
import * as React from 'react';
import loadable from '@loadable/component'
import Loading from './components/loading'

const Content = React.lazy(() => import('./components/content'))

const NewContent = loadable(() => import('./components/content'))

const AsyncPage = loadable((props: any) => import(`./components/${props.page}`))

const Test = () => {

    const numTest = (n: number): number => {
        return n * n
    }

    const [num, setNum] = React.useState(0)


    return (
        <>
            <div>  {numTest(2)} </div>


            {/* 测试代码拆分 */}
            <button onClick={() => { import('../utils/crud').then(curd => { setNum(x => curd.add(x)) }) }} >+</button>
            <span> {num}</span>
            <button onClick={() => { import('../utils/crud').then(curd => { setNum(x => curd.reduce(x)) }) }} >-</button>
            <br />

            {/* 测试React.lazy */}
            <React.Suspense fallback={<Loading />} >
                <Content />
            </React.Suspense>

            <br />
            {/*
                React.lazy 和 Suspense 尚不可用于服务器端渲染。
                如果要在服务器渲染的应用程序中进行代码拆分，
                我们建议使用 Loadable Components 。
                它有一个很好的服务器端渲染打包拆分指南
             */}
            <NewContent />

            <br />
            {/* 异步加载信息 */}
            <AsyncPage page={'content'} />
            <AsyncPage page={'slider'} />
        </>
    )
}


export default Test

