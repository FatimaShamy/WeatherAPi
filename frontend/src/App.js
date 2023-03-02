import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Weather from './pages/Weather'
function App() {
  const handleOnSearchChange=(searchData)=>{
    console.log(searchData)
  }
  return (
    <>
    
    <Router>
       <div className='container'>
         <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/Weather' element={<Weather/>}/>
         </Routes>
       </div>
    </Router></>
  );
}

export default App;
