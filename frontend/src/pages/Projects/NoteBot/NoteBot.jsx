import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getUserInfo } from "./utils/api.js";

//import chatbot from "./components/chatbot.jsx";
//import courses from "./components/courses.jsx";
//import home from "./components/home.jsxjsx";
//import notes from "./components/notes.jsx";

import noteBotLogo from "../../../assets/images/noteBot-logo.png";
import NoteList from "./NoteList.jsx";
//import NoteHome from "./NoteHome.jsx";
import ChooseLayout from "./ChooseLayout.jsx";
import CreateNote from "./CreateNote.jsx";
import EditNote from "./EditNote";
import Section from "./Section";
import Routes from "./Routes";
import NoteView from "./NoteView";

export default function NoteBot() {
  const [user, setUser] = useState({
    message: "Server not connected",
    user: {
      uid: "",
      name: "",
      username: "",
    },
  });

  console.log(user);

  useEffect(() => {
    let elasUser = JSON.parse(sessionStorage.getItem("elas-user"));
    async function getUserInfoFunction(userId) {
      let reponse = await getUserInfo(userId);
      setUser((prevState) => ({
        ...prevState,
        message: reponse.message,
        user: {
          uid: reponse.user.uid,
          name: reponse.user.name,
          username: reponse.user.username,
        },
      }));
    }
    getUserInfoFunction(elasUser.id);
  }, []);

  return (
    <Grid container justifyContent="center" sx={{ py: 4, px: 2 }}>
      <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent={"center"}>
            <Grid
              item
              component="img"
              src={noteBotLogo}
              alt="NoteBot Logo"
              xs={12}
              sm={7}
              md={4}
              sx={{ width: "100%", pb: 2 }}
            />
          </Grid>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs>
              <NoteList />
              <ChooseLayout />
              <CreateNote />
              <EditNote />
              <Section />
              <Routes />
              <NoteView />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
