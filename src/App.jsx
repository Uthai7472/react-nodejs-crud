import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Add from './components/Add';
import Read from './components/Read';
import Update from './components/Update';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}/>
          <Route path='/add' element={<Add />} />
          <Route path='/read/:id' element={<Read />} />
          <Route path='/update/:id' element={<Update />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;