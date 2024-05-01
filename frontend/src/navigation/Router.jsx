import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

//  PAGES
import About from '../pages/About'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import Artisans from '../pages/Artisans'
import Home from '../pages/Home'
import Artisan from '../pages/Artisan'
import Auth from '../pages/Auth'
import Dashboard from '../pages/protected/Dashboard'
import PrivateRoutes from './PrivateRouteMiddleware'
import Profile from '../pages/protected/Profile'

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='artisans'>
          <Route index element={<Artisans />} />
          <Route path=':artisanSlug' element={<Artisan />} />
        </Route>
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='services' element={<Services />} />
        <Route path='authentication' element={<Auth />} />
        <Route path='dashboard' element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}


export default Router
