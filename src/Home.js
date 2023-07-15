import React, {useState} from "react";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {useNavigate} from "react-router-dom";
import {Sidebar} from "primereact/sidebar";
import {Menu} from "primereact/menu";

const Home = (props) => {

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    let items = [
        {
            label: 'Planzenübersicht',
            icon: 'pi pi-fw pi-database',
            command: () => {
                setVisible(false);
                navigate('/uebersicht');
            }
        },
        {
            label: 'PH-Wert bewerten',
            icon: 'pi pi-fw pi-thumbs-up',
            command: () => {
                setVisible(false);
                navigate('/auswahl');
            }
        }
    ];


    return (
        <div>
            <div className="card flex justify-content-center">
                <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <h2>Menü</h2>
                    <Menu model={items}/>
                </Sidebar>

            </div>
            <div className="App">
                <div style={{fontFamily: "Verdana"}}
                     className="md:w-25rem">
                    <div className="card flex space-between">
                        <Button icon="pi pi-bars left-0" onClick={() => setVisible(true)}/>
                        <Button label="PH-Messer" onClick={() => navigate("/auswahl")}
                                className="bg-white text-6xl font-bold border-0 text-green-500"/>
                    </div>
                    <Card>{props.component}</Card>
                </div>
            </div>
        </div>
    )
}

export default Home;
