import { useNavigation, NavLink, Link, redirect, HashRouter } from 'react-router-dom'
import { useState } from 'react'

export default function Scroll({pages, nPage}){
  // const navegation = useNavigation() Es el useNavigate, no este!!
  const intPage = parseInt(nPage)
  const [page, Setpage] = useState(pages[0][nPage])
  console.log('asdf',pages[0][nPage])
  // console.log(pages.length, typeof(parseInt(nPage)))
  return(
    nPage == 'all' ? null : (
      <ol id='scroll-pagina'>
        {nPage > 0 ? (
          <NavLink className='enlace_boton navA' to={`/page/${intPage-1}`}>Anterior</NavLink>
          ) : null}
          
        { (nPage > 1) ? (
          <NavLink className='enlace_boton navA' to={`/page/${intPage - 2}`}>{intPage - 2}</NavLink>
          ) : null}
            
        { (nPage > 0) ? (
          // <Link className='enlace_boton navA' to={`/page/${intPage - 1}`}>{intPage - 1}</Link>
          <Link className='enlace_boton navA' to={`/page/${intPage - 1}`}>{intPage - 1}</Link>
          ) : null}
  
        <NavLink className='enlace_boton navA' to='#navegacion'>{ intPage }</NavLink>
  
        { (pages.length - 1) - nPage > 0 ? (
          <Link className='enlace_boton navA' to={`/page/${intPage + 1}`}>{intPage + 1}</Link>
          ) : null}
  
        { (pages.length - 2
        ) - nPage > 0 ? (
          <Link className='enlace_boton navA' to={`/page/${intPage + 2}`}>{intPage + 2}</Link>
          ) : null}
  
        <NavLink  className='enlace_boton navA'  to='#navegacion'>..</NavLink>
  
        {nPage == pages.length-1 ? (
          null
          ) : (
          <NavLink className='enlace_boton navA' to={`/page/${intPage+1}`}>Siguiente</NavLink>
          )}
      </ol>
    )
  )
}