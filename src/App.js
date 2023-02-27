import SvgEdytor from "./components/svg-edytor";
import Toolbar from "./components/ui/toolbar";
import WorkingField from "./components/ui/working-field";
import InfoPanel from "./components/ui/info-panel";
import {useEffect, useState} from "react";

function App() {

    const [activeTool, setActiveTool] = useState(null);
    const [childrenList, setChildrenList] = useState([]);

    useEffect(() => {
        console.log(childrenList);
    }, [childrenList])

    return (
        <SvgEdytor>
            <Toolbar activeTool={activeTool} click={tool => setActiveTool(tool)}/>
            <WorkingField activeTool={activeTool}
                          setActiveTool={setActiveTool}
                          setChildrenList={setChildrenList}
                          childrenList={childrenList}
                          width={650}
                          height={650} />
            <InfoPanel activeTool={activeTool} setActiveTool={setActiveTool} childrenList={childrenList}/>
        </SvgEdytor>
    );
}

export default App;
