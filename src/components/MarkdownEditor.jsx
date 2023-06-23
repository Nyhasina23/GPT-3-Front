import * as React from "react";
import "styles/markdown.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import { Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { apiURL, fileServerAPI } from "../services/apiUrl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { showNavbar } from "features/snackbar.slice";
import { useNavigate } from "react-router-dom";

export default function MarkdowmEditor() {
  const [content, setContent] = React.useState("Write your blog post here...");
  const [selectedTab, setSelectedTab] = useState("write");
  const [loading, setLoading] = useState(false);
  const [file, setFileUpload] = useState();
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const uploadFile = (event) => {
    setFileUpload(event.target.files);
  };

  const saveBlog = async () => {
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("images", file[0]);
    }
    await axios({
      method: "POST",
      url: `${fileServerAPI}/upload`,
      data: formData,
    })
      .then(async (res) => {
        console.log("res ", res);

        await axios({
          method: "POST",
          url: `${apiURL}/blog/create`,
          headers: {
            authorization: token,
          },
          data: {
            title,
            content,
            image: res?.data[0],
            type,
          },
        })
          .then((response) => {
            dispatch(
              showNavbar({
                message: response.data.MESSAGE,
                type: "SUCCESS",
                open: true,
              })
            );
            setLoading(false);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((error) => {
            dispatch(
              showNavbar({
                message: error.response.data.MESSAGE,
                type: "FAIL",
                open: true,
              })
            );
            setLoading(false);
          });
      })
      .catch((error) => {
        dispatch(
          showNavbar({
            message: "Error on uploading image",
            type: "FAIL",
            open: true,
          })
        );
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <Typography variant="h5" mb={2}>
        Ajout d'article
      </Typography>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onChange={handleChangeTitle}
        sx={{ marginBottom: "1rem", width: "100%" }}
      />
      <ReactMde
        value={content}
        onChange={setContent}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(
            <ReactMarkdown children={markdown} source={markdown} />
          )
        }
        minEditorHeight={400}
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
      <div>
        <Box sx={{ minWidth: 120 }} mt={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select value={type} label="Type" onChange={handleChangeType}>
              <MenuItem value="ACCORD">ACCORD</MenuItem>
              <MenuItem value="BLOG">BLOG</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h6" mt={2}>
          Ajouter une image
        </Typography>
        <Input
          type="file"
          fullWidth={true}
          placeholder="Ajouter une image..."
          sx={{ margin: "1rem 0 1rem 0" }}
          onChange={uploadFile}
        />
        <Button variant="contained" className="save-btn" onClick={saveBlog}>
          {!loading ? (
            <span> Enregistrer </span>
          ) : (
            <LoadingButton
              className="loadGenerateButton"
              loading
            ></LoadingButton>
          )}
        </Button>
      </div>
    </div>
  );
}
