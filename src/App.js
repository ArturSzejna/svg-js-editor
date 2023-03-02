import SvgEdytor from "./components/svg-edytor";
import Toolbar from "./components/ui/left-panel/toolbar";
import WorkingField from "./components/ui/working-field";
import InfoPanel from "./components/ui/right-panel/info-panel";
import {useEffect, useState} from "react";

function App() {

    const [activeTool, setActiveTool] = useState(null);
    const [activeElement, setActiveElement] = useState(null);
    const [elements, setElements] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {

    }, [elements])

    return (
        <SvgEdytor>
            <Toolbar activeTool={activeTool}
                     click={tool => setActiveTool(tool)}/>

            <WorkingField activeTool={activeTool}
                          setActiveTool={setActiveTool}
                          activeElement={activeElement}
                          setActiveElement={setActiveElement}
                          elements={elements}
                          setElements={setElements}
                          selectedIndex={selectedIndex}
                          setSelectedIndex={setSelectedIndex}
                          width={650}
                          height={650}/>

            <InfoPanel activeTool={activeTool}
                       setActiveTool={setActiveTool}
                       activeElement={activeElement}
                       setActiveElement={setActiveElement}
                       elementList={elements}
                       setElementList={setElements}
                       selectedIndex={selectedIndex}
                       setSelectedIndex={setSelectedIndex}/>

        </SvgEdytor>
    );
}

export default App;
