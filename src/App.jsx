// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <>
      <h1 style = {
        {
          padding: "2rem 1.5rem",
          color: "#FF99CF"
        }
      }>Vite + React</h1>
      <Person></Person> {/* I haven't yet learnt how to add a className here, or may be it's not even possible. */}
      <Person></Person>
      <Person></Person>
      <Developer name="Doulat" stack="TanStack Start"></Developer>
      <Developer name="Abul Kala M" stack="Next.js"></Developer>
      <Developer name="Uzzaman Can" stack="Laravel"></Developer>
      <Player name="Thiago Alcantara" passAccuracy="98"></Player>
    </>
  )
}

function Player(name, passAccuracy) {

  return (
    <div>
      {/* Spread all 'stats' into the component as individual props */}
      <h3>Player: {name}</h3>
      <p>Pass accuracy: {passAccuracy}%</p>
    </div>
  );

}

// function Player() {
//   const stats = { passAccuracy: "92%", goals: 12, assist: 5 };

//   return (
//     <div>
//       {/* Spread all 'stats' into the component as individual props */}
//       <Player name="Sadik" age={25} {...stats} />
//     </div>
//   );
// }

// 2. Props
function Developer (props) {
  console.log(props);
  //Destructuring: I could use destructured value with spread operator to rather than props
  //const {name, stack} = {name: "Doulat", stack: "TanStack Start"};

  return (
    <div style={
      {
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
        border: "1px solid #FF00FF",
        margin: "0.5rem",
        padding: "1rem 0.75rem"
      }
    }>
      <h3 style={{margin: "0rem"}}>Developer {props.name}</h3>
      <p>Technology stack: {props.stack}</p>
    </div>
  )
}

// 1. Styling, Statically value passing from functions own variable
function Person () {
  const age = 29 ;// JavaScript works has finish before return appears.s
  const profession = "Gold Miner";
  const personStyle ={
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  }
  return(
    <>
      <p title = "Used title attribute to add this 'hover over and find what's this about' " className = "counter" style={personStyle}>I am a person {age}. I'm a {profession}</p>
    </>
  )
}

export default App
