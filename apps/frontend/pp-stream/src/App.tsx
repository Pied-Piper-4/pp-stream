import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Nav/Navbar';
import { Banner } from './components/Banner/Banner';
import { About } from './components/About/About';
import { VideoFuture } from './components/Video/VideoFuture';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <VideoFuture />
      <About />
      <Footer />
      {/* <Banner/> */}
    </>
  );
}

export default App;
