// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

import Startstep from 'src/pages/Startstep/Startstep'
import WelcomePage from 'src/pages/WelcomePage/WelcomePage'
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage'

const Routes = () => {
  return (
    <Router>
      <Route path="/startstep" page={Startstep} name="startstep" />
      <Route path="/" page={WelcomePage} name="welcome" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
