// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <Person></Person> {/* I haven't yet learnt how to add a className here, or may be it's not even possible. */}
      <Person></Person>
      <Person></Person>
    </>
  )
}

function Person () {
  const age = 29 ;// JavaScript works has finish before return appears.s
  const profession = "Gold Miner"
  return(
    <>
      <p className = "counter">I am a person {age}. I'm a {profession}</p>
    </>
  )
}

export default App
