import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState, useEffect } from "react"
import { Button, ButtonGroup, Box, styled } from "@mui/material"

const Papa = require("papaparse")


const Grid = (props) => {
  const [errors, setErrors] = useState("")
  const [gridApi, setGridApi] = useState(null)

  const handleGridReady = (params) => {
    setGridApi(params.api)
    params.api.sizeColumnsToFit()
  }

  const resizeGrid = () => {
    gridApi.sizeColumnsToFit()
  }

  useEffect(() => {
    (async () => {
      while (gridApi == null)
        await new Promise(resolve => setTimeout(resolve, 1000));
      resizeGrid()
      setTimeout(() => { gridApi.setRowData(props.rowData) }, 0)
      window.addEventListener("resize", resizeGrid)
    })();

    return () => {
      window.removeEventListener("resize", resizeGrid)
    }
  })

  const [rowData] = useState([])

  const [colDefs] = useState([
    { field: 'question', editable: true, lockPosition: true, resizable: true },
    { field: 'label', editable: false, lockPosition: true, resizable: true },
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

    if (data.length == 0) {
      setErrors("No questions submitted!")
      return
    }

    const questions = data.map(dat => dat.question)
    const reqBody = { question: questions }

    const res = await fetch("/api/getlabel", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "content-type": "application/json" }
    })

    if (res.ok) {
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
    gridApi.applyTransactionAsync({ add: [{}] })
  }

  const deleteRow = (e) => {
    gridApi.applyTransactionAsync({ remove: [e.node.data] })
}

const reAddRow = (e) => {
    // Check that row doesn't already exist
    if (gridApi.getRowNode(e.node.id) == undefined) {
        gridApi.applyTransactionAsync({ add: [e.node.data] })
    }
}

  const Input = styled('input')({
    display: 'none',
  });


  return (
    <Box sx={{ padding: "3em" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Button onClick={addRow}> Add Question</Button>
          <label>
            <Input type="file" accept=".csv" onChange={handleImport} />
            <Button component="span"> Upload CSV </Button>
          </label>
        </Box>
        <Box>
          <Button onClick={handleCSVUpload}> Submit Questions</Button>
        </Box>


      </Box>

      <div className="ag-theme-alpine" style={{ height: "60vh", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onGridReady={handleGridReady}
          rowDragEntireRow={true}
          onRowDragLeave={deleteRow}
          onRowDragEnd={reAddRow}
        />
      </div>


    </Box>
  )
}

export default Grid