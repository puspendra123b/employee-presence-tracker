import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import './App.css'
import { AdminLogin } from './Pages/AdminLogin'
import { AdminSignup } from './Pages/AdminSignup'
import { UserLogin } from './Pages/UserLogin'
import { UserSignup } from './Pages/UserSignup'
import { AdminDashboard } from './Pages/AdminDashboard'
import { UserDashboard } from './Pages/UserDashboard'
import { Landing } from './Pages/Landing'

function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path={'/'} element={ <Landing />} />
        <Route path={'/admin/signin'} element={ <AdminLogin />} />
        <Route path={'/admin/signup'} element={ <AdminSignup />} />
        <Route path={'/admin/dashboard'} element={ <AdminDashboard route={'admin'} />} />
        <Route path={'/user/signin'} element={ <UserLogin />} />
        <Route path={'/user/signup'} element={ <UserSignup />} />
        <Route path={'/user/dashboard'} element={ <UserDashboard route={'user'} />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
