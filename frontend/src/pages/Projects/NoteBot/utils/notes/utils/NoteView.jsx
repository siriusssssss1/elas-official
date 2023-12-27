import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Container, Stack } from "@mui/material";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../../contexts/AuthProvider";

import { Section } from "../create/Section";
import { deleteNote, getWidgets, updateNoteRating } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { StarRating } from "../../../components/StarRating";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles({
  underline: {
    "& input": {
      fontSize: "24px",
    },
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});