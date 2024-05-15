import Footer from './components/Footer'
import Header from './components/Header'

import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'


import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-5'>
          <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />

          {/* <Link to={`/product/${id}`}>View Product</Link> */}

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App
