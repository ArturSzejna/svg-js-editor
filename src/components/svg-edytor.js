import {Box} from "@mui/material";

const SvgEdytor = (props) => {
    return (
        <Box component="section" sx={{
            display: 'flex',
            flexDirection: 'row',
            minHeight: '100vh',
            backgroundColor: '#bdbdbd'
        }}>
            {props.children}
        </Box>
    )
}

export default SvgEdytor;