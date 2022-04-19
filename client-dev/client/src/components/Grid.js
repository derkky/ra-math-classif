import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState } from "react"
const Papa = require("papaparse")


const Grid = (props) => {
    const setErrors = props.setErrors
    const [gridApi, setGridApi] = useState(null)

    const handleGridReady = (params) => {
      setGridApi(params.api)
      params.api.sizeColumnsToFit()
      window.addEventListener("resize", () => {
          params.api.sizeColumnsToFit()
      })
    }
    const [rowData] = useState([])
  
    const [colDefs] = useState([
      {field: 'question', editable: true, lockPosition: true, resizable: true},
      {field: 'label', editable: false, lockPosition: true, resizable: true},
    ]);

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
    
      const handleCSVUpload = async () => {
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
        setErrors(null)
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
        <>
            <h3> Alternatively, input multiple questions (or upload CSV) below</h3>
            <div className="gridButtons">
                <button onClick={addRow}> Add row</button>
                <input type="file" accept=".csv" onChange={handleImport}/>
                <button onClick={handleCSVUpload}>Submit CSV</button>
            </div>
            <div className="ag-theme-alpine" style={{height: "40vh", width: "40vw"}}>
                <AgGridReact 
                rowData={rowData}
                columnDefs={colDefs}
                onGridReady={handleGridReady}
                rowDragEntireRow={true}
                />
            </div>


        </>
    )
}

export { Grid }