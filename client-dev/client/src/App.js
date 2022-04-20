import './App.css';
import { useState } from "react"
import { Grid } from "./components/Grid"



function App() {
  const [question, setQuestion] = useState(null)
  const [labels, setLabels] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleSubmitQuestion = async (e) => {
    e.preventDefault()
    if (question == null){
      setErrors("No question submitted!")
      return
    }
    
   const reqBody = {question: question}

   const res = await fetch("/api/getlabel", {
     method: "POST",
     body: JSON.stringify(reqBody),
     headers: {"content-type": "application/json"}
   })

   if (res.ok){
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
    <div className="App">
      <div className="app-content">
        <h1> Don and Brenda's Math Question Classifier</h1>
        <h3> Input Single Question Below</h3>
        <form>
          <input type="textarea" rows="4" onChange={handleQuestionChange}/>
          <input type="submit" onClick={handleSubmitQuestion}/>
        </form>

        <div className="label-display">
          <h3>
            Labels
          </h3>
          {labels ? labels[0].label : "Submit a question"}
        </div>

        <Grid setErrors={setErrors}/>

        <div className="error-display">
          {errors ? errors : <div></div>}
        </div>
      </div>
      


    </div>
  );
}

export default App;
