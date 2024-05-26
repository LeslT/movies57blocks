import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import FavoriteMovies from './views/movies/FavoriteMovies'
import RegisterView from './views/auth/RegisterView'
import MovieDetails from './views/movies/MovieDetails'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path='/' element={<DashboardView/>} index/>
                    <Route path='/favorites' element={<FavoriteMovies/>}/>
                    <Route path='/details' element={<MovieDetails/>}/>
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path='/login' element={<LoginView/>} />
                    <Route path='/register' element={<RegisterView/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}