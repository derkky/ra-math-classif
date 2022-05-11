import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState, useEffect } from "react"
import { Button, Alert, Box, styled } from "@mui/material"

const Papa = require("papaparse")


const Grid = (props) => {
  const [errors, setErrors] = useState("")
  const [showErrors, setShowErrors] = useState(false)
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
      window.addEventListener("resize", resizeGrid)
    })();

    return () => {
      window.removeEventListener("resize", resizeGrid)
    }
  })

  const [rowData] = useState([])

  const [colDefs] = useState([
    {
      field: 'question',
      editable: true,
      lockPosition: true,
      resizable: true,
      wrapText: true,
      autoHeight: true,
      cellEditor: "agLargeTextCellEditor",
    },
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
      setShowErrors(true)
      setErrors("No questions submitted!")
      return
    }

    if (data.filter(dat => dat.question == "").length > 0){
      setShowErrors(true)
      setErrors("No blank questions allowed!")
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
      setErrors("")
      setShowErrors(false)
      const resJson = await res.json()
      gridApi.setRowData(resJson.labels)
      console.log(resJson)

    } else {
      console.log(res.statusText)
      setShowErrors(true)
      setErrors(res.statusText)
    }
  }

  const addRow = () => {
    gridApi.applyTransactionAsync({ add: [{}] })
  }

  const deleteRow = () => {
    const selection = gridApi.getSelectedRows()
    gridApi.applyTransactionAsync({ remove: selection })
  }

  const Input = styled('input')({
    display: 'none',
  });


  return (
    <Box sx={{ padding: {sm: 1, md: 3} }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Button onClick={addRow}> Add Question</Button>
          <Button onClick={deleteRow}> Delete Selected Questions </Button>
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
          rowSelection="multiple"
          onCellValueChanged={() => {
            setErrors("")
            setShowErrors(false)
          }}
        />
      </div>

      {showErrors ?
        <Box
          mt={2}
        >
          <Alert severity="error">
            {errors}
          </Alert>
        </Box>
        : null
      }


    </Box>
  )
}

export default Grid