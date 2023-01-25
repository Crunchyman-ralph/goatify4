import {
  ArchiveIcon,
  CalculatorIcon,
  ChartBarIcon,
  DownloadIcon,
  HomeIcon,
  OfficeBuildingIcon,
  TagIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navLinks = [
  {
    name: 'Accueil',
    path: '/',
    icons: <HomeIcon className="h-5 w-5" />,
  },
  {
    name: 'Analyses de données',
    path: '/stats',
    icons: <ChartBarIcon className="h-5 w-5" />,
  },
  {
    name: 'Shops',
    path: '/shops',
    icons: <OfficeBuildingIcon className="h-5 w-5" />,
  },
  {
    name: 'Produits',
    path: '/products',
    icons: <ArchiveIcon className="h-5 w-5" />,
  },
  {
    name: 'Catégories',
    path: '/categories',
    icons: <TagIcon className="h-5 w-5" />,
  },
  {
    name: 'Importer',
    path: '/products/import',
    icons: <DownloadIcon className="h-5 w-5" />,
  },
  {
    name: 'Calculateur',
    path: '/calculator',
    icons: <CalculatorIcon className="h-5 w-5" />,
  },
]

function Sidebar(): JSX.Element {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <div className="drawer-side">
      <label htmlFor="main-menu" className="drawer-overlay z-10"></label>

      <aside className="flex w-80 flex-col bg-base-200 text-base-content">
        <div className="sticky top-0 z-50 hidden w-full bg-base-200 transition duration-200 ease-in-out lg:block">
          <div className="navbar justify-center">
            <Link href="/" passHref={true}>
              <button
                className="btn btn-ghost px-2 md:px-4"
                aria-label="Homepage"
              >
                <div className="font-title inline-block text-3xl text-primary">
                  <span>GOAT</span>
                  <span className="text-base-content">ify</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <ul className="menu w-80 overflow-y-auto bg-base-200 p-3 text-base-content">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path} passHref={true}>
                  <a
                    className={`flex rounded-md text-sm font-medium ${
                      pathname === link.path ? 'active' : ''
                    }`}
                  >
                    {link.icons}
                    <span className="mx-3 capitalize">{link.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
