import { HomeNavBar } from 'components/navbars'
import React, { useCallback, useState } from 'react'
import { bg } from 'utils/Images'

type Props = {}

const HomePage = (props: Props) => {
  

  return (
    <section>
      <HomeNavBar />
      <div className="home-bg" />
    </section>
  )
}

export default HomePage