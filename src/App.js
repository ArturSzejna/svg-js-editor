import './App.css';
import SvgEdytor from "./components/svg-edytor";
import Toolbar from "./components/ui/toolbar";
import WorkingField from "./components/ui/working-field";
import InfoPanel from "./components/ui/info-panel";
import {useEffect, useState} from "react";

function App() {

    const [activeTool, setActiveTool] = useState(null);

    useEffect(() => {
        console.log(activeTool);
    }, [activeTool])

    return (
        <SvgEdytor>
            <Toolbar activeTool={activeTool} click={tool => setActiveTool(tool)}/>
            <WorkingField activeTool={activeTool} width={650} height={650}/>
            <InfoPanel />
        </SvgEdytor>
    );
}

export default App;
