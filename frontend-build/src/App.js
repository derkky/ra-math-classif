import './App.css';
import { useState } from "react"
import { Grid } from "./components/Grid"
import CssBaseline from "@mui/material/CssBaseline"
import NavBar from "./components/NavBar"


function App() {
  const [question, setQuestion] = useState(null)
  const [labels, setLabels] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleSubmitQuestion = async (e) => {
    e.preventDefault()
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
      setErrors(null)
      const resJson = await res.json()
      setLabels(resJson.labels)
      console.log(resJson)
    } else {
      console.log(res.statusText)
      setErrors(res.statusText)
    }

  }

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value)
  }


  return (
    <>
      <CssBaseline />
      <NavBar/>

    </>

  );
}

export default App;
