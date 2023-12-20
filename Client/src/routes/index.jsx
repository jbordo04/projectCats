import { NavLink, useNavigate } from "react-router-dom";

export default function Index(){
  let navigate = useNavigate()
  
  function changePage(){
    try{
      console.log('asdf')
    // throw new Error('Opción erronea!!', {status: 401})
    } catch (e) {
      console.error('aee',e)
    } finally {
      navigate('tet0')  
    }
  }

  function newErr(e){
    console.log(e.target)
    throw new Error('Opción erronea!!')
  }

  return (
    <div className="indexBody" >
      <div className="indexImg"></div>
      <h1 className="indexTitle">
        Bienvenidos al maravilloso mundo de los gatos.
        <br />
        Quieres acceder y enamorarte para siempre jamás de estos animalitos?
      </h1>      
      
      <div className="indexButton">
        <button onClick={() => navigate('/page/0')} className="buttonYes">Si</button>
        {/* <button  className="buttonYes">Si</button> */}
        {/* <button onClick={changePage} className="buttonNo">No</button> */}
        <button onClick={() => {
          alert(`Respuesta incorrecta!!`)
          alert(`Prueba Otra vez!!!`)
        }} className="buttonNo">No</button>

      </div>
    </div>
  )
} 