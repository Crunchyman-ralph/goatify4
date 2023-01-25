import { ChevronDownIcon, LogoutIcon, MenuIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import Breadcrumbs from './breadcrumbs'

function Navbar(): JSX.Element {
  useEffect(() => {
    themeChange(false)
  }, [])

  const { data: session } = useSession()

  const [navbarShadow, setNavbarShadow] = useState(false)

  useEffect(() => {
    const handleScroll = (element: HTMLElement) => {
      if (element.scrollTop >= 10) {
        setNavbarShadow(true)
      } else {
        setNavbarShadow(false)
      }
    }
    const element = document.getElementById('main')
    if (element)
      element.addEventListener('scroll', function () {
        handleScroll(element)
      })
    return () => {
      if (element)
        element.removeEventListener('scroll', function () {
          handleScroll(element)
        })
    }
  }, [])

  return (
    <div
      className={`navbar sticky top-0 z-50 min-h-0 bg-base-100 bg-opacity-90 backdrop-blur transition-shadow duration-500 ${
        navbarShadow ? 'shadow-sm' : ''
      }`}
    >
      <label
        htmlFor="main-menu"
        className="btn btn-ghost btn-square drawer-button lg:hidden"
      >
        <MenuIcon className="h-7 w-7" />
      </label>
      <Link href="/" passHref={true}>
        <div className="btn btn-ghost text-3xl font-bold text-primary lg:hidden">
          <span>GOAT</span>
          <span className="text-base-content">ify</span>
        </div>
      </Link>

      <Breadcrumbs />

      <div className="flex-1" />

      <div className="mr-2 flex-none">
        <div className="dropdown dropdown-end" tabIndex={0}>
          <button
            className="btn btn-ghost px-2 md:px-4"
            aria-label="accountDropdown"
          >
            {session?.user?.name || 'Guest'}
            <ChevronDownIcon className="ml-1 h-4 w-4 pb-0.5" />
          </button>
          <div
            className="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow-xl"
            tabIndex={0}
          >
            <li>
              <select
                className="select select-bordered select-sm mb-2 py-0"
                data-choose-theme
                onChange={(e) => {
                  // add/remove dark classname to toggle tailwind dark mode on/off
                  if (e.target.value === 'myDarkTheme') {
                    document.body.classList.add('dark')
                  } else {
                    document.body.classList.remove('dark')
                  }
                }}
              >
                <option value="myLightTheme">Clair 💡</option>
                <option value="myDarkTheme">Sombre 🌑</option>
              </select>
            </li>
            <li>
              <button
                onClick={() => {
                  signOut()
                }}
              >
                <LogoutIcon className="mr-2 inline-block h-5 w-5 stroke-current" />
                Se déconnecter
              </button>
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
