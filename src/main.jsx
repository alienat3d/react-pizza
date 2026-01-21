import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import App from '/src/App.jsx'

// 12.3.0 Здесь, в корневом файле мы импортируем и хранилище Redux и обёртку Provider, ...
import store from "/src/redux/store"
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 7.4.0 Для активации функционала ReactRouter нам нужно обернуть главный компонент App в BrowserRouter. */}
    {/* (go to [App.jsx]) */}
    <BrowserRouter>
      {/* 12.3.1 ...чтобы обернуть в неё App, т.о. передав ему хранилище и "подружив React с Redux Toolkit". (Можно было бы обернуть и "BrowserRoute", т.к. тут нет никакой принципиальной разницы. */}
      {/* (Go to [05-counterSlice.js]) */}
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
