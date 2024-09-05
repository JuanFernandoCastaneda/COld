import * as React from 'react';
import { useNavigate, Link } from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../css/landing_page.css'
import bgImage from '../assets/bg.jpg'

import Markdown from './markdown';
import {PrivacyPolicyPopup} from './popup/privacy_policy'
import { GameTile, useGetGameInfoQuery } from '../state/api'
import path from 'path';
import { IconButton } from '@mui/material';

const flag = {
  'Dutch': '🇳🇱',
  'English': '🇬🇧',
  'French': '🇫🇷',
  'German': '🇩🇪',
  'Italian': '🇮🇹',
  'Spanish': '🇪🇸',
}

function GithubIcon({url='https://github.com'}) {

  return <div className="github-link">
    <a title="view the Lean game server on Github" href={url}>
    <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" className="">
      <path fill="#fff" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
    </svg>
    </a>
    </div>
}

function Tile({gameId, data}: {gameId: string, data: GameTile|undefined}) {

  let navigate = useNavigate();
  const routeChange = () =>{
    navigate(gameId);
  }

  if (typeof data === 'undefined') {
    return <></>
  }

  return <div className="game" onClick={routeChange}>
    <div className="wrapper">
      <div className="title">{data.title}</div>
      <div className="short-description">{data.short}
      </div>
      { data.image ? <img className="image" src={path.join("data", gameId, data.image)} alt="" /> : <div className="image"/> }
      <div className="long description"><Markdown>{data.long}</Markdown></div>
    </div>
    <table className="info">
      <tbody>
      <tr>
        <td title="consider playing these games first.">Prerequisites</td>
        <td><Markdown>{data.prerequisites.join(', ')}</Markdown></td>
      </tr>
      <tr>
        <td>Worlds</td>
        <td>{data.worlds}</td>
      </tr>
      <tr>
        <td>Levels</td>
        <td>{data.levels}</td>
      </tr>
      <tr>
        <td>Language</td>
        <td title={`in ${data.languages.join(', ')}`}>{data.languages.map((lan) => flag[lan]).join(', ')}</td>
      </tr>
      </tbody>
    </table>
  </div>

}

function LandingPage() {

  const navigate = useNavigate();

  const [impressum, setImpressum] = React.useState(false);
  const openImpressum = () => setImpressum(true);
  const closeImpressum = () => setImpressum(false);

  // const [allGames, setAllGames] = React.useState([])
  // const [allTiles, setAllTiles] = React.useState([])

  // const getTiles=()=>{
  //   fetch('featured_games.json', {
  //     headers : {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   }
  //   ).then(function(response){
  //     return response.json()
  //   }).then(function(data) {
  //     setAllGames(data.featured_games)

  //   })
  // }

  // React.useEffect(()=>{
  //   getTiles()
  // },[])

  // React.useEffect(()=>{

  //   Promise.allSettled(
  //     allGames.map((gameId) => (
  //       fetch(`data/g/${gameId}/game.json`).catch(err => {return undefined})))
  //   ).then(responses =>
  //     responses.forEach((result) => console.log(result)))
  //   //   Promise.all(responses.map(res => {
  //   //     if (res.status == "fulfilled") {
  //   //       console.log(res.value.json())
  //   //       return res.value.json()
  //   //     } else {
  //   //       return undefined
  //   //     }
  //   //   }))
  //   // ).then(allData => {
  //   //   setAllTiles(allData.map(data => data?.tile))
  //   // })
  // },[allGames])

  // TODO: I would like to read the supported games list form a JSON,
  // Then load all these games in
  //
  let allGames = [
    // "local/my-game", ASÍ PONDRÍA ESTA VAINA SI TUVIERA algo en la carpeta junto a la carpeta de lean4game.
    "juancastaneda/my-game"
  ]
  let allTiles = allGames.map((gameId) => (useGetGameInfoQuery({game: `g/${gameId}`}).data?.tile))

  return <div className="landing-page">
    <header style={{backgroundImage: `url(${bgImage})`}}>
      <nav>
        <GithubIcon url="https://github.com/JuanFernandoCastaneda/COld"/>
        <a className="link" href="https://flaglab.github.io/">
          <img src="/client/public/flag-logo-inverted.png" height="20rem" />
        </a>
      </nav>
      <div id="main-title">
        <h1>Nombre chulito</h1>
        <p>
          Software asistente de pruebas matemáticas basado en <a target="_blank" href="https://leanprover-community.github.io/">Lean</a> <i>(Lean 4)</i> y su librería matemática <a target="_blank" href="https://github.com/leanprover-community/mathlib4">mathlib</a>
        </p>
      </div>
    </header>
    <div className="game-list">
      {allTiles.length == 0 ?
        <p>No Games loaded. Use <a>http://localhost:3000/#/g/local/FOLDER</a> to open a
          game directly from a local folder.
        </p>
        : allGames.map((id, i) => (
          <Tile
            key={id}
            gameId={`g/${id}`}
            data={allTiles[i]}
          />
        ))
      }
    </div>
    {/* 
    <section>
      <div className="wrapper">
        <h2>Development notes</h2>
        <p>
          As this server runs lean on our university machines, it has a limited capacity.
          Our current estimate is about 70 simultaneous games.
          We hope to address and test this limitation better in the future.
        </p>
        <p>
          Most aspects of the games and the infrastructure are still in development. Feel free to
          file a <a target="_blank" href="https://github.com/leanprover-community/lean4game/issues">GitHub Issue</a> about
          any problems you experience!
        </p>
      </div>
    </section>
    */}
    <section>
      <div className="wrapper">
        <h2>Project development</h2>
        <p>
          This project uses <a target="_blank" href='https://adam.math.hhu.de'>Lean Game Server</a> at its core. A server developed as part of the project <a target="_blank" href="https://hhu-adam.github.io">ADAM : Anticipating the Digital Age of Mathematics</a> at Heinrich-Heine-Universität in Düsseldorf.
        </p>
      </div>
    </section>
    <footer>
      <a className="link" onClick={openImpressum}>Impressum</a>
      {impressum? <PrivacyPolicyPopup handleClose={closeImpressum} />: null}
      <a className="link" href="https://sistemas.uniandes.edu.co/">Departamento de Ingeniería de Sistemas y Computación Uniandes</a>
      <a className="link" href='https://uniandes.edu.co/'>
        <img src="/client/public/logo-uniandes_1.png" height="40rem" />
      </a> 
    </footer>
  </div>

}

export default LandingPage
