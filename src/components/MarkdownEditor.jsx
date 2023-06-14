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
import { useSelector } from "react-redux";

export default function MarkdowmEditor() {
  const [content, setContent] = React.useState("Write your blog post here...");
  const [selectedTab, setSelectedTab] = useState("write");
  const [loading, setLoading] = useState(false);
  const [file, setFileUpload] = useState();
  const [filename, setFileUploadFilename] = useState();
  const [title, setTitle] = useState();

  const token = useSelector((state) => state.user.token);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const uploadFile = (event) => {
    setFileUpload(event.target.files);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("images", file[0]);
    await axios({
      method: "POST",
      url: `${fileServerAPI}/upload`,
      data: formData,
    })
      .then((res) => {
        setFileUploadFilename(res.data[0]);
      })
      .catch(() => {
        console.log("Error uploading file");
      });
  };

  const saveBlog = async () => {
    //upload image
    await uploadImage();

    //create blog
    await axios({
      method: "POST",
      url: `${apiURL}/blog/create`,
      headers: {
        authorization: token,
      },
      data: {
        title,
        content,
        image: filename,
      },
    })
      .then((response) => {
        console.log(" blog created ", response);
      })
      .catch((error) => {
        console.log(" error when creating blog ", error);
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
        minEditorHeight={500}
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
      <div>
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
