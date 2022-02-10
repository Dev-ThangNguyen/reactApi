import clsx from 'clsx'
import { Link, Route, Routes } from 'react-router-dom'
import Index from './component/Todos/Index.js'
import styles from './component/Todos/index.module.scss'
import Home from './component/Home/Home.js'
import Page_1 from './component/Page/Page.js'


function App () {

  return(
    <div className={clsx(styles.wraps)}>
      <header className={clsx(styles.header)}>
          <Link to='/reactApi'>Todos</Link>
          <Link to='/page-1'>Page_1</Link>
          <Link to='/page-2'>Page-2</Link>
      </header>
      <Routes>
        <Route path='/reactApi' element={<Index/>}/>
        <Route path='/page-1' element={<Home />}/>
        <Route path='/page-2' element={<Page_1/>}/>
      </Routes>
    </div>
  )
}

export default App;