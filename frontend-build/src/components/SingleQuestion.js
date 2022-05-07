import { Typography, Card, CardContent, CardHeader, CardActions, Box, Button, TextField, } from "@mui/material"
import { useState } from "react"

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
            setLabel(resJson.labels)
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
            sx={{ display: "flex", flexWrap: "wrap", padding: "3em", gap: "2em" }}>
            <Card sx={{ minWidth: 500, flex: 1 }}>
                <CardHeader title="Type in your question below" />

                <CardContent>
                    <Box sx={{ display: "flex", margin: "1em" }}>
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
            <Card sx={{ minWidth: 500, flex: 1 }}>
                <CardHeader title="The type of your question is..." />

                <CardContent>
                    <Typography variant="h1" align="center">
                        {label}
                    </Typography>
                </CardContent>
            </Card>
        </Box>

    )
}

export default SingleQuestion