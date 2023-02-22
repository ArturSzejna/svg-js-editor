import SvgEdytor from "./components/svg-edytor";
import Toolbar from "./components/ui/toolbar";
import WorkingField from "./components/ui/working-field3";
import InfoPanel from "./components/ui/info-panel";
import {useState} from "react";

function App() {

    const [activeTool, setActiveTool] = useState(null);

    return (
        <SvgEdytor>
            <Toolbar activeTool={activeTool} click={tool => setActiveTool(tool)}/>
            <WorkingField activeTool={activeTool} setActiveTool={setActiveTool} width={650} height={650} />
            <InfoPanel />
        </SvgEdytor>
    );
}

export default App;
