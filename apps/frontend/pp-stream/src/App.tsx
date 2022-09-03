import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Nav/Navbar';
import { Banner } from './components/Banner/Banner';
import { About } from './components/About/About';
import { VideoFuture } from './components/Video/VideoFuture';
import { Footer } from './components/Footer/Footer';
import { Section } from './components/Section/Section';

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <VideoFuture />
      <Section />
      {/* <About /> */}

      <Footer />
      {/* <Banner/> */}
    </>
  );
}

export default App;
