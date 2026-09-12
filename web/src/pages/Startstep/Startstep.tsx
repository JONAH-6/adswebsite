// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const Startstep = () => {
  return (
    <>
      <Metadata title="Start Step" description="Start step page" />

      <h1>Startstep</h1>
      <p>
        Find me in <code>./web/src/pages/startstep/startstep.tsx</code>
      </p>
      {/*
          My default route is named `startstep`, link to me with:
          `<Link to={routes.startstep()}>Start Step</Link>`
      */}
    </>
  )
}

export default Startstep
