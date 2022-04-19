import './App.css';
import { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Papa = require("papaparse")

function App() {
  const [gridApi, setGridApi] = useState(null)

  const handleGridReady = params => {
    setGridApi(params.api)
    params.api.sizeColumnsToFit()
  }
  const [rowData] = useState([])

  const [colDefs] = useState([
    {field: 'question', editable: true, lockPosition: true, resizable: true},
    {field: 'label', editable: false, lockPosition: true, resizable: true},
  ]);


  const [question, setQuestion] = useState(null)
  const [labels, setLabels] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
   const reqBody = {question: question}

   const res = await fetch("/api/getlabel", {
     method: "POST",
     body: JSON.stringify(reqBody),
     headers: {"content-type": "application/json"}
   })

   if (res.ok){
    const resJson = await res.json()
    setLabels(resJson.labels)
    console.log(resJson)
   } else {
     console.log(res.statusText)
     setErrors(res.statusText)
   }

  }

  const handleChange = (e) => {
    setQuestion(e.target.value)
  }

  const handleImport = (e) => {
    console.log("Imported")

    const csv = e.target.files[0]

    const setGridRows = (results, file) => {
      // results will have error also, can do error handling
      gridApi.setRowData(results.data)
    }

    Papa.parse(csv, 
      {
        complete: setGridRows,
        skipEmptyLines: true,
        header: true,
        transformHeader: (header) => header.toLowerCase()
      }
    )
  }

  const handleCSV = async () => {
    let data = []
    gridApi.forEachNode(row => data.push(row.data))
    
    const questions = data.map(dat => dat.question)
    const reqBody = {question: questions}

    const res = await fetch("/api/getlabel", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {"content-type": "application/json"}
    })
 
    if (res.ok){
     const resJson = await res.json()
     gridApi.setRowData(resJson.labels)
     console.log(resJson)

    } else {
      console.log(res.statusText)
      setErrors(res.statusText)
    }
   }

  const addRow = () => {
    gridApi.applyTransaction({ add: [{}]})
  }

  return (
    <div className="App">
      <h1> Don and Brenda's Math Question Classifier</h1>

      <h3> Input Single Question Below</h3>
      <form>
        <input type="textarea" rows="4" onChange={handleChange}/>
        <input type="submit" onClick={handleSubmit}/>
      </form>

      <div className="labelsDisplay">
        <h3>
          Labels
        </h3>
        {labels ?
            <ul>
              {labels.map( lbl => <li key={lbl.label}> {lbl.label} </li>)}
            </ul>
          : "Submit a question"}
      </div>

      <h3> Alternatively, input multiple questions (or upload CSV) below</h3>
      <div className="gridButtons">
        <button onClick={addRow}> Add row</button>
        <input type="file" accept=".csv" onChange={handleImport}/>
        <button onClick={handleCSV}>Submit CSV</button>
      </div>
      <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
        <AgGridReact 
          rowData={rowData}
          columnDefs={colDefs}
          onGridReady={handleGridReady}
          rowDragEntireRow={true}
        />
      </div>

      <div className="errorDisplay">
          {errors ? 
            errors 
            : <div></div>}
      </div>
    </div>
  );
}

export default App;
