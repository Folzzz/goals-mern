import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Login, Dashboard, Register} from './pages';
import { Header } from './components';

const App = () => {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
    
  )
}

export default App