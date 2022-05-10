import CssBaseline from "@mui/material/CssBaseline"
import NavBar from "./components/NavBar"
import SingleQuestion from './components/SingleQuestion';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Stack, Toolbar, Box } from "@mui/material"
import MultipleQuestions from './components/MultipleQuestions';
import About from './components/About';
import { ThemeProvider, createTheme } from "@mui/material/styles"

let theme = createTheme({
  palette: {
    primary: { main: "#112d4e", contrastText: "#facf39" },

  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2}>
        <NavBar />
        <Toolbar style={{ marginTop: 0 }} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SingleQuestion />} />
            <Route path="/singlequestion" element={<SingleQuestion />} />
            <Route path="/multiplequestions" element={<MultipleQuestions />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </ThemeProvider>



  );
}

export default App;
