import SvgEdytor from "./components/svg-edytor";
import Toolbar from "./components/ui/toolbar";
import WorkingField from "./components/ui/working-field";
import InfoPanel from "./components/ui/info-panel";
import {useEffect, useState} from "react";

function App() {

    const [activeTool, setActiveTool] = useState(null);
    const [activeElement, setActiveElement] = useState(null);

    useEffect(() => {
        console.log(activeElement);
    }, [activeElement])

    return (
        <SvgEdytor>
            <Toolbar activeTool={activeTool}
                     click={tool => setActiveTool(tool)}/>

            <WorkingField activeTool={activeTool}
                          setActiveTool={setActiveTool}
                          activeElement={activeElement}
                          setActiveElement={setActiveElement}
                          width={650}
                          height={650}/>

            <InfoPanel activeTool={activeTool}
                       setActiveTool={setActiveTool}
                       activeElement={activeElement}
                       setActiveElement={setActiveElement}/>
        </SvgEdytor>
    );
}

export default App;
