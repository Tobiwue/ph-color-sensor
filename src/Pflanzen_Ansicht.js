import React, {useEffect, useState} from "react";
import {ProgressSpinner} from 'primereact/progressspinner';
import {Card} from "primereact/card";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {useLocation} from "react-router-dom";
import data from "./pflanzen_data.json";
import messwert from "./gemessen.json"

const Pflanzen_Ansicht = () => {

    const location = useLocation();
    const ph_gemessen = messwert["ph_wert"];
    const ideal_min = data[location.state.name]["PH_MIN"]
    const ideal_max = data[location.state.name]["PH_MAX"]
    let bewertung = "";
    let card_title = "";
    let card_text = "";
    const [loading, setLoading] = useState(true);
    const [elements, setElements] = useState(<ProgressSpinner/>);

    function bewerte() {
        const min = parseFloat(ideal_min.replace(",", "."));
        const max = parseFloat(ideal_max.replace(",", "."));
        const gemessen = parseFloat(ph_gemessen.replace(",", "."));

        if (gemessen <= max &&
            gemessen >= min) {
            bewertung = "bg-green-100";
            card_title = "Alles im Lot!";
            return ("ideal")
        } else if ((max + 0.5) < gemessen) {
            bewertung = "bg-red-100";
            card_title = "Änderungsbedarf"
            card_text = "Damit es deiner Pflanze in Zukunft gut geht, solltest du den Pflanzenboden saurer machen. " +
                "Dafür kannst du bspw. Kaffeesatz, das kompostierte Laub von Eichen, Walnuss- oder Nadelbäumen oder spezielle Dünger zu deiner Erde hinzufügen."
            return ("zu basisch")
        } else if (gemessen < (min - 0.5)) {
            bewertung = "bg-red-100";
            card_title = "Änderungsbedarf"
            card_text = "Damit es deiner Pflanze in Zukunft gut geht, solltest du den Pflanzenboden basischer machen. " +
                "Dafür kannst du verschiedene Arten von Kalk, bspw. Algenkalk, Kalkmergel und Gartenkalk, zu deiner Erde hinzufügen."
            return ("zu sauer")
        } else if (max < gemessen <= (max + 0.5)) {
            bewertung = "bg-yellow-100";
            card_title = "Leichter Änderungsbedarf"
            card_text = "Damit es deiner Pflanze in Zukunft gut geht, solltest du den Pflanzenboden ein wenig saurer machen. " +
                "Dafür kannst du bspw. Kaffeesatz, das kompostierte Laub von Eichen, Walnuss- oder Nadelbäumen oder spezielle Dünger zu deiner Erde hinzufügen."
            return ("leicht zu basisch");
        } else {
            bewertung = "bg-yellow-100";
            card_title = "Leichter Änderungsbedarf";
            card_text = "Damit es deiner Pflanze in Zukunft gut geht, solltest du den Pflanzenboden ein wenig basischer machen. " +
                "Dafür kannst du verschiedene Arten von Kalk, bspw. Algenkalk, Kalkmergel und Gartenkalk, zu deiner Erde hinzufügen."
            return ("leicht zu sauer");
        }
    }

    useEffect(() => {
            if (loading === true) {
                setTimeout(function () {

                    console.log(ph_gemessen);
                    setElements(
                        <div className="flex flex-column card-container green-container row-gap-3 text-justify">

                            Der ideale PH-Wert der Pflanze "{location.state.name}" liegt
                            zwischen {ideal_min} und {ideal_max}.
                            Demnach
                            ist ein gemessener PH-Wert von {ph_gemessen} {bewerte()}.

                            <Card title={card_title} className={bewertung}>
                                {card_text}
                            </Card>
                        </div>)
                    setLoading(false)
                }, 3000);
            }
        }
    )

    return (
        elements
    )
};

export default Pflanzen_Ansicht;
