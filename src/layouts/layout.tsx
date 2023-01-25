import Footer from '../common/components/navbars/footer'
import Navbar from '../common/components/navbars/navbar'
import Sidebar from '../common/components/navbars/sidebar'
import CoreLayout from './core/coreLayout'

export default function Layout(props: { children: JSX.Element }): JSX.Element {
  return (
    <CoreLayout>
      <div className="drawer drawer-mobile min-h-screen">
        <input id="main-menu" type="checkbox" className="drawer-toggle"></input>
        <Sidebar />
        <main id="main" className="drawer-content relative">
          <Navbar />
          <div className="min-h-full p-5">{props.children}</div>
          <Footer />
        </main>
      </div>
    </CoreLayout>
  )
}
