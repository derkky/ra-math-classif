import Grid from "./Grid"
import { Card, Box } from "@mui/material"

const MultipleQuestions = () => {
    return (
        <Box sx={{ padding: { sm: 2, md: 3 } }}>
            <Card sx={{ boxShadow: 5 }}>
                <Grid />
            </Card>
        </Box>
    )
}

export default MultipleQuestions