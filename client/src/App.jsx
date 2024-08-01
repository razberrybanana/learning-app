import "./App.css";
import { Container, AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from 'react';
import MyTheme from "./themes/MyTheme";
import Contacts from "./pages/Contact";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import MyForm from "./pages/MyForm";
import Register from './pages/Register';
import Login from './pages/Login';
import http from './http';
import Suggestions from './pages/Suggestion';
import AddSuggestion from './pages/AddSuggestion';
import EditSuggestion from './pages/EditSuggestion';
import Surveys from './pages/Survey';
import AddSurvey from './pages/AddSurvey';
import EditSurvey from './pages/EditSurvey';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <Router>
      <ThemeProvider theme={MyTheme}>
        <AppBar position="static" className="AppBar">
          <Container>
            <Toolbar disableGutters={true}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" component="div">
                  Community Club
                </Typography>
              </Link>
              <Box sx={{ flexGrow: 1 }}></Box>
              {user && (
                <>
                  <Typography>{user.name}</Typography>
                  <Button onClick={logout}>Logout</Button>
                </>
              )}
              {!user && (
                <>
                  <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Register</Typography>
                  </Link>
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Login</Typography>
                  </Link>
                </>
              )}
              <Link to="/contacts" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography>Contact Us</Typography>
              </Link>

              <Link to="/Suggestion" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography>Suggestions</Typography>
              </Link>

              <Link to="/surveys" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography>Survey</Typography>
              </Link>

            </Toolbar>
          </Container>
        </AppBar>

        <Container>
          <Routes>
            <Route path={"/"} element={<Contacts />} />
            <Route path={"/contacts"} element={<Contacts />} />
            <Route path={"/addcontact"} element={<AddContact />} />
            <Route path={"/editcontact/:id"} element={<EditContact />} />
            <Route path={"/form"} element={<MyForm />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/Suggestion"} element={<Suggestions />} />
            <Route path={"/addsuggestion"} element={<AddSuggestion />} />
            <Route path={"/editsuggestion/:id"} element={<EditSuggestion />} />
            <Route path={"/surveys"} element={<Surveys />} />
            <Route path={"/addsurvey"} element={<AddSurvey />} />
            <Route path={"/editsurvey/:id"} element={<EditSurvey />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
