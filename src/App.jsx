import '/src/assets/fonts/proxima-nova-regular.eot'
import '/src/assets/fonts/proxima-nova-regular.woff2'
import '/src/assets/fonts/proxima-nova-regular.woff'
import '/src/assets/fonts/proxima-nova-regular.ttf'
import '/src/assets/fonts/proxima-nova-extrabold.eot'
import '/src/assets/fonts/proxima-nova-extrabold.woff2'
import '/src/assets/fonts/proxima-nova-extrabold.woff'
import '/src/assets/fonts/proxima-nova-extrabold.ttf'
import '/src/assets/fonts/proxima-nova-black.eot'
import '/src/assets/fonts/proxima-nova-black.woff2'
import '/src/assets/fonts/proxima-nova-black.woff'
import '/src/assets/fonts/proxima-nova-black.ttf'
import '/src/assets/fonts/proxima-nova-bold.eot'
import '/src/assets/fonts/proxima-nova-bold.woff2'
import '/src/assets/fonts/proxima-nova-bold.woff'
import '/src/assets/fonts/proxima-nova-bold.ttf'
import '/src/scss/app.scss'
// import React from "react"
import {Route, Routes} from "react-router"
import Home from "/src/pages/Home.jsx"
import {Cart} from "/src/pages/Cart.jsx"
import {Page404} from "/src/pages/404.jsx"
import Header from "/src/components/Header.jsx"

// export const SearchContext = React.createContext()

export default function App() {
  // const [searchValue, setSearchValue] = React.useState('')

  return (
    // <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </div>
      </div>
    // </SearchContext.Provider>
  )
}