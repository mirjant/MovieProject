import cinemaPhoto from "./assets/cinema+photo.jpg";
import "./App.css"

function TopImg (){

    
    return(
        <>

<div className="contanier-top-img">
    <h1>Cinema+</h1>
    <h4>Experience the magic of cinema like never before. <br /> Dive into the world of movies today and let your imagination soar! </h4>
        <img id="top-img" src={cinemaPhoto} alt="" />
      
      </div>
        </>
    )
}
export default TopImg;