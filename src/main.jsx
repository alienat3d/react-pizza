import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";
import App from '/src/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 7.4.0 Для активации функционала ReactRouter нам нужно обернуть главный компонент App в BrowserRouter. */}
    {/* (go to [App.jsx]) */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
