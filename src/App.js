import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React from "react";
import Pflanzen_Auswahl from "./Pflanzen_Auswahl";
import Pflanzen_Ansicht from "./Pflanzen_Ansicht";
import Pflanzen_Uebersicht from "./Pflanzen_Uebersicht";
import Home from "./Home";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/ansicht" element={
                    <Home component={<Pflanzen_Ansicht/>}/>}/>
                <Route path="/auswahl" element={
                    <Home component={<Pflanzen_Auswahl/>}/>}/>
                <Route path="/uebersicht" element={
                    <Home component={<Pflanzen_Uebersicht/>}/>}/>
                <Route path="*" element={
                    <Home component={<Pflanzen_Auswahl/>}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
