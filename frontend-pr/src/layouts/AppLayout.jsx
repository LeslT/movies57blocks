import { NavLink, Outlet, Navigate  } from "react-router-dom"
import Logo from "../components/Logo"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";
import { useQueryClient } from '@tanstack/react-query'
import Spinner from "../components/Spinner/Spinner";


export default function AppLayout() {
  const { data, isError, isLoading } = useAuth()
  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    localStorage.removeItem('USER_EMAIL')
    queryClient.invalidateQueries({queryKey: ['user']})
  }
  if(isLoading) return <Spinner/>
  if(isError){
    return <Navigate to='/login'/>
  }
  if(data) return (
    <div>
      <header className="bg-gray-800 py-5">
        <div className="mx-auto container px-5 -py-16">
          <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-64">
              <Logo />
            </div>
            <nav className="flex gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? " text-purple-800 uppercase font-bold"
                    : " text-pink-800 uppercase font-bold"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? " text-purple-800 uppercase font-bold"
                    : " text-pink-800 uppercase font-bold"
                }
              >
                Favorites
              </NavLink>
              <button
              className='uppercase font-bold hover:text-red-950 text-red-700'
              type='button'
              onClick={logout}
            >
              Logout
            </button>
            </nav>

          </div>
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center">
          All rights reserved{new Date().getFullYear()}
        </p>
      </footer>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
