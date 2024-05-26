
import '@styles/globals.css'
import Navbar from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Smart Prompt',
    description: 'Descover and Share AI Prompts'
}

const Layout = ({children}) => {
  return (
    <html lang='en'>
        <body>
          <Provider>
            <div className="main">
                <div className="gradient"></div>
            </div>
            <main className="app">
                <Navbar />
                {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default Layout