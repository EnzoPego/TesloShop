'use client'

import clsx from "clsx"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

import { useUIStore } from "@/store"
import { logout } from "@/actions"


export const Sidebar = () => {

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
  const closeSideMenu = useUIStore(state => state.closeSideMenu)

  const { data: session } = useSession()
  //console.log({session})

  const isAuthenticated = !!session?.user

  const userRole = session?.user.role 
  //console.log ({userRole})


  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-20" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fade-in fixed top-0 left-0 h-screen w-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-8 py-1 pr-8 border-b-2 text-md border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {isAuthenticated && (
          <>
            {/* Menú */}
            <Link
              href="/profile"
              className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoPersonOutline size={20} />
              <span className="ml-3 text-md">Perfil</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={20} />
              <span className="ml-3 text-md">Ordenes</span>
            </Link>

            {isAuthenticated && (
              <button
                onClick={() => logout()}
                className="flex  w-full items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoLogOutOutline size={20} />
                <span className="ml-3 text-md">Salir</span>
              </button>
            )}
          </>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={() => closeSideMenu()}
            className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={20} />
            <span className="ml-3 text-md">Ingresar</span>
          </Link>
        )}


        {userRole === "admin" ? (
          <>
            {/* Line separator */}
            <div className="w-full h-px bg-gray-200 my-8" />
            <Link
              href="/"
              className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={20} />
              <span className="ml-3 text-md">Productos</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={20} />
              <span className="ml-3 text-md">Ordenes</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={20} />
              <span className="ml-3 text-md">Usuarios</span>
            </Link>
          </>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
}
