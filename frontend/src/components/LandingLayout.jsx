import React from 'react'
import LandingNav from './LandingNav'
import {Outlet } from 'react-router-dom'
const LandingLayout = () => {
  return (
    <>
    <LandingNav/>
    <Outlet/>
    </>
  )
}

export default LandingLayout