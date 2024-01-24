import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getUserInfo } from "./utils/api.js";
import Button from "@mui/material/Button";
//import Home from "./components/home";
//import SavedNotesList from "./components/saved-list";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MyNotes from "./components/MyNotes.jsx";
import MyFavorites from "./components/MyFavorites.jsx";
import Drafts from "./components/Drafts.jsx";
import AddNote from "./components/AddNote.jsx";
//import CreateNote from "./utils/notes/CreateNote.jsx";
import SearchPage from './components/search.jsx';


import noteBotLogo from "../../../assets/images/noteBot-logo.png";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NoteBot() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    message: "Server not connected",
    user: {
      uid: "",
      name: "",
      username: "",
    },
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let elasUser = JSON.parse(sessionStorage.getItem("elas-user"));
    async function getUserInfoFunction(userId) {
      let reponse = await getUserInfo(userId);
      if (reponse.user !== undefined) {
        setUser((prevState) => ({
          ...prevState,
          message: reponse.message,
          user: {
            uid: reponse.user.uid,
            name: reponse.user.name,
            username: reponse.user.username,
          },
        }));
      } else {
        setUser((prevState) => ({
          ...prevState,
          message: reponse.message,
        }));
      }
    }
    getUserInfoFunction(elasUser.id);
  }, []);

  return (
    <Grid container justifyContent="center" sx={{ py: 4, px: 2 }}>
      <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid
              item
              component="img"
              src={noteBotLogo}
              alt="NoteBot Logo"
              xs={6}
              sm={3}
              md={2}
              sx={{ width: "100%", pb: 5
             }}
            />
              <div className="App">
                {/* Your other components */}
                <SearchPage />
              </div>
          </Grid>
          <Grid container justifyContent="center" spacing={100}>
            <Grid item xs={12}>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "space-around",
                    
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                    
                  >
                    <Tab
                      label="My Notes"
                      {...a11yProps(0)} sx={{ color: "#ED7D31", fontWeight: "bold", marginRight: 6 }}
                    />
                    <Tab
                      label="My Favorites"
                      {...a11yProps(0)} sx={{ color: "#ED7D31", fontWeight: "bold", marginRight: 6 }}
                    />
                    <Tab
                      label="My Drafts"
                      {...a11yProps(0)} sx={{ color: "#ED7D31", fontWeight: "bold", marginRight: 6 }}
                    />
                    <Button
                      variant="outlined"
                      {...a11yProps(0)}
                      sx={{
                        color: "#ED7D31",
                        fontWeight: "bold",
                        borderColor: "#ED7D31", 
                        marginRight: 6,
                      }}
                      onClick={() => navigate("/projects/notebot/notes/create")} //adding Note
                    >
                      {" "}
                      + ADD NOTE{" "}
                    </Button>

                    {/* label: "Add Note",
            startIcon: <AddIcon />,
            onClick: () => navigate("/notes/create"),
            color: "primary", */}

                
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <MyNotes />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <MyFavorites />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <Drafts />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <AddNote />
                </CustomTabPanel>
              </Box>
              {/* <CustomTabPanel value={value} index={4}>
                <CreateNote />
              </CustomTabPanel> */}
            </Grid>
          </Grid>
          {/* <Home />
          <SavedNotesList /> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
