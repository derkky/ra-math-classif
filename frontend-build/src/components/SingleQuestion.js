import { Typography, Card, CardContent, CardHeader, CardActions, Box, Button, TextField, } from "@mui/material"
import { useState } from "react"
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles"


let theme = createTheme()
theme = responsiveFontSizes(theme)

const SingleQuestion = () => {

    const [question, setQuestion] = useState("")
    const [label, setLabel] = useState("")
    const [errors, setErrors] = useState("")
    const [showErrors, setShowErrors] = useState(false)

    const handleSubmitQuestion = async (e) => {
        e.preventDefault()
        console.log(question)
        if (question == null) {
            setErrors("No question submitted!")
            return
        }

        const reqBody = { question: question }

        const res = await fetch("/api/getlabel", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: { "content-type": "application/json" }
        })

        if (res.ok) {
            setErrors("")
            setShowErrors(false)
            const resJson = await res.json()
            setLabel(resJson.labels[0])
            console.log(resJson)
        } else {
            console.log(res.statusText)
            setErrors(res.statusText)
            setShowErrors(true)

        }

    }

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value)
    }

    return (
        <Box
            sx={{ display: "flex", flexWrap: "wrap", padding: 3, gap: 2 }}>
            <Card sx={{ minWidth: 320, flex: 1, boxShadow: 5 }}>
                <CardHeader title="Type in your question below" />

                <CardContent>
                    <Box sx={{ display: "flex", margin: 1 }}>
                        <TextField
                            sx={{ flex: 1 }}
                            multiline
                            maxRows={5}
                            value={question}
                            onChange={handleQuestionChange}
                            error={showErrors}
                            label={errors}
                        />
                    </Box>

                    <Box
                        sx={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                        <CardActions>
                            <Button onClick={handleSubmitQuestion}> Submit Question </Button>
                        </CardActions>
                    </Box>

                </CardContent>
            </Card>
            <Card sx={{ minWidth: 320, flex: 1, boxShadow: 5 }}>
                <CardHeader title="The type of your question is..." />

                <CardContent sx={{ fontSize: 32 }}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h2" align="center">
                            {label.label}
                        </Typography>
                    </ThemeProvider>
                </CardContent>
            </Card>
        </Box>

    )
}

export default SingleQuestion