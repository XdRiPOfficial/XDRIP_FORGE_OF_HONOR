import Header from './components/Header';
import Hero from './components/Hero';
import Forge from './components/Forge';
import Footer from './components/Footer';
import Alert from './components/Alert';
import Loading from './components/Loading';


const App = () => {
     return (
    <div className="Parent">
      <div className="Child">
        <Hero />
        <Header />
        </div>
      <Forge />
      <Footer />
      <Alert/>
      <Loading />
      </div>
  )
}

export default App;