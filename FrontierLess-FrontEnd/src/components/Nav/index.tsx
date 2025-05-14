"use client"
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { logout } from "@/services/authServices"
import { useRouter } from "next/navigation";

import LinkMenu from './components/LinkMenu';
import MenuIcon from './components/MenuIcon';
import NotificationIcon from './components/NotificationIcon';

export default function Nav() {
    const { user, setUser } = useUser();
    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handlelogout = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await logout();
            setUser(null);
            console.log(">>>:", data);
            router.push("/login");
        } catch (error) {
            console.error(">>>:", error);
        }
    };

    return (
        <nav className="bg-gray-800 min-h-16">
            {user &&
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-between">
                        <MenuIcon onClick={toggleMenu} />
                        <div className="sm:block hidden items-center">
                            <h1 className="px-3 py-2 text-3xl font-bold text-gray-300 ">FrontierLess</h1>
                        </div>
                        <div className="flex space-x-4 flex-1 hidden sm:ml-6 sm:block items-center justify-center sm:items-stretch sm:justify-start">
                            <LinkMenu href="/" >Início</LinkMenu>
                            <LinkMenu href="/profile" >Perfil</LinkMenu>
                            <LinkMenu href="/findProject" >Buscar Projetos</LinkMenu>
                        </div>

                        <div></div>
                        <div className='flex space-x-3'>
                            <NotificationIcon />
                            <p className="text-white rounded focus:outline-none text-gray-200 border px-3 py-1">{user.name}</p>
                            <button onClick={handlelogout} className="text-white rounded focus:outline-none text-gray-200  px-3 py-1" >Sair</button>
                        </div>

                    </div>

                    <div className={`${isMenuOpen ? 'sm' : 'hidden'} flex justify-between flex-col space-y-1 px-2 pb-3 pt-2 sm:hidden rounded-md px-3 py-2 text-base font-medium text-gray-300`}>
                        <h1 className="px-3 py-2 text-3xl font-bold text-gray-300 border-b">ForntierLess</h1>
                        <LinkMenu href="/" >Início</LinkMenu>
                        <LinkMenu href="/profile" >Perfil</LinkMenu>
                        <LinkMenu href="/findProject" >Buscar Projetos</LinkMenu>
                    </div>
                </>


            }
            {!user &&
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-between">
                        <MenuIcon onClick={toggleMenu} />
                        <div className="sm:block hidden items-center">
                            <h1 className="px-3 py-2 text-3xl font-bold text-gray-300 ">ForntierLess</h1>
                        </div>
                        <div className="flex space-x-4 flex-1 hidden sm:ml-6 sm:block items-center justify-center sm:items-stretch sm:justify-start">
                            <LinkMenu href="/" >Início</LinkMenu>
                        </div>
                        <div></div>
                        <div className="flex">
                            <LinkMenu href="/register" >Cadastre-se</LinkMenu>
                            <LinkMenu href="/login" >Login</LinkMenu>
                        </div>
                    </div>
                    <div className={`${isMenuOpen ? 'sm' : 'hidden'} flex justify-between flex-col space-y-1 px-2 pb-3 pt-2 sm:hidden rounded-md px-3 py-2 text-base font-medium text-gray-300`}>
                        <h1 className="px-3 py-2 text-3xl font-bold text-gray-300 border-b">ForntierLess</h1>
                        <LinkMenu href="/" >Início</LinkMenu>
                    </div>
                </>

            }
        </nav >
    );
}