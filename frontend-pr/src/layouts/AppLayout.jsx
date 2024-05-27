import { NavLink, Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  return (
    <div>
        <header className="bg-gray-800 py-5">
            <div className="mx-auto container px-5 -py-16">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Logo/>
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to='/' className={({isActive})=> 
                            isActive ? " text-purple-800 uppercase font-bold" : " text-pink-800 uppercase font-bold"
                        }>Home</NavLink>
                        <NavLink to='/favorites'  className={({isActive})=> 
                            isActive ? " text-purple-800 uppercase font-bold" : " text-pink-800 uppercase font-bold"}>Favorites</NavLink>
                </nav>
                </div>

            </div>
        </header>
        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet/>
        </section>
        <footer className="py-5">
            <p className="text-center">
                All rights reserved{new Date().getFullYear()}
            </p>
        </footer>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />

    </div>
  )
}
