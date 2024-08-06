import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login'// Assuming the Login component is in the same directory
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

    
