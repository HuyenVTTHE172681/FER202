import React from 'react';
import { Container } from "react-bootstrap";
import mainData from "./data.json"
// import Main from './components/Main';
// import Footer from './components/Footer';
// import Header from './components/Header';
import Detail from './components/Detail';
import './App.css';


function App() {
    const products = mainData?.products;
    console.log("Products: ", products);

    return (
        <Container>
            {/* Header */}
            {/* <Header /> */}

            {/* Main */}
            {/* <Main /> */}

            {/* Footer */}
            {/* <Footer /> */}

            {/* Detail */}
            <Detail />



        </Container>
        
    )
}

export default App;