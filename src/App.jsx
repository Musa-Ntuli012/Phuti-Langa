import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BackToTop from './components/common/BackToTop';
import PageTransition from './components/common/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Showcase from './pages/Showcase';
import CV from './pages/CV';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route 
              path={ROUTES.HOME} 
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } 
            />
            <Route 
              path={ROUTES.ABOUT} 
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              } 
            />
            <Route 
              path={ROUTES.SHOWCASE} 
              element={
                <PageTransition>
                  <Showcase />
                </PageTransition>
              } 
            />
            <Route 
              path={ROUTES.CV} 
              element={
                <PageTransition>
                  <CV />
                </PageTransition>
              } 
            />
            <Route 
              path={ROUTES.CONTACT} 
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              } 
            />
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
