import Banner from "../components/Banner"
import CountingBar from "../components/CountingBar"
import Header from "../components/Header"
import Offer from "../components/Offer"
import SpecialityMenu from "../components/SpecialityMenu"
import TopDoctors from "../components/TopDoctors"


function Home() { 
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <CountingBar />
      <Offer />
      <Banner />
    </div>
  )
}

export default Home