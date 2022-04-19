import './App.css';
import { useState } from "react"
import { Grid } from "./components/Grid"



function App() {
  const [question, setQuestion] = useState(null)
  const [label, setLabel] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleSubmitQuestion = async (e) => {
    e.preventDefault()
    
   const reqBody = {question: question}

   const res = await fetch("/api/getlabel", {
     method: "POST",
     body: JSON.stringify(reqBody),
     headers: {"content-type": "application/json"}
   })

   if (res.ok){
     setErrors(null)
    const resJson = await res.json()
    setLabel(resJson.labels)
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
      <h1> Don and Brenda's Math Question Classifier</h1>

      <h3> Input Single Question Below</h3>
      <form>
        <input type="textarea" rows="4" onChange={handleQuestionChange}/>
        <input type="submit" onClick={handleSubmitQuestion}/>
      </form>

      <div className="labelsDisplay">
        <h3>
          Labels
        </h3>
        {label ? label : "Submit a question"}
      </div>

      <Grid setErrors={setErrors}/>

      <div className="errorDisplay">
        {errors ? errors : <div></div>}
      </div>
    </div>
  );
}

export default App;
