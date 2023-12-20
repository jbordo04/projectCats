import { Link, NavLink, useLoaderData } from "react-router-dom";

export default function Side({nPage}){
  function formSubmit(event) {
    // console.log(event.target.value)
    const valueRange = event.target.value
    return { valueRange }    
  }

  const { valueRange } = useLoaderData()
  console.log(valueRange)
  return(
    <div className="aside">
      <button className='buttonFree'>
        { (nPage == 'all') ? (
          <NavLink to='/page/1'>Ver Pagina</NavLink>
          ) : (
          <NavLink to='/page/all'>Ver Album</NavLink>
          )}
      </button>

      {(nPage == 'all') ? (
        <>
          <h4>Utilice el filtro adecuado</h4> 

          <ol className='aside_list_ol'>
            <li className='aside_list_link'>
              <p>Filtrar por:</p> 
              <form id='search'>
                <label for='searchfield'>Titulo en local</label>
                <input type='text' id='searchField' name='searchField' onkeyup='filterbyText(this)' placeholder='Busco a...'/>
              </form>
            </li>	
            
            <br />

            <li className='aside_list_link'>
              <label>Rango de edad</label>
              <form onChange={formSubmit}>
                <input type='range' 
                        id='age' 
                        name='rangeAge' 
                        min='0'
                        max ='7' 
                        // value='0'                    
                        />
                {(valueRange) ? (
                  <span id='rangeValue'>{valueRange}</span> 
                  ) : null}

                <label for='age'>Edad</label>

              </form>

              <Link id='link_params' href='#' >Reset</Link>

              <script>
                toRange()
                const url_params = document.location.pathname
                const id_params = url_params.split('/')[2]
                console.log(id_params)
                document.getElementById('link_params').href = '/pagina_param/'+ id_params
              </script>
            </li>
            <br/>
            <li >
              <button className='buttonFree'>Gratuito</button> 
              {/* Hay que poner margen entres estos botones */}
              <button className='buttonFree'>Premium</button>
            </li>
          </ol>     
        </>
      ) : null}



        

    </div>
  )
}