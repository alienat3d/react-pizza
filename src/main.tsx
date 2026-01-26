import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import App from './App'

// 12.3.0 Здесь, в корневом файле мы импортируем и хранилище Redux и обёртку Provider, ...
import {store} from './redux/store'
import {Provider} from 'react-redux'

// 22.6 Нужно сообщить TS, что да, мы уверены, что элемент с id 'root' существует с помощью "!" после его нахождения в аргументе для "createRoot".
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* 7.4.0 Для активации функционала ReactRouter нам нужно обернуть главный компонент App в BrowserRouter. */}
        {/* (go to [App.tsx]) */}
        <BrowserRouter>
            {/* 12.3.1 ...чтобы обернуть в неё App, т.о. передав ему хранилище и "подружив React с Redux Toolkit". (Можно было бы обернуть и "BrowserRoute", т.к. тут нет никакой принципиальной разницы. */}
            {/* (Go to [05-counterSlice.js]) */}
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </StrictMode>
)