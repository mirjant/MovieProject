import Navbar1 from "./Navbar1";
import Maincard from "./Movies/Maincard";
import TopRatedMovies from "./TopRatedCarusel";
import Footer from "./Footer";
import TopImg from "./CinemaTopImg";
function HomePage() {
  return (
    <>
      <Navbar1></Navbar1>
      <TopImg></TopImg>
      <TopRatedMovies></TopRatedMovies>
      <Maincard></Maincard>
      <Footer></Footer>
    </>
  );
}
export default HomePage;
