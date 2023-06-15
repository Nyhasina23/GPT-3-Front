import * as React from "react";
import "styles/markdown.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { apiURL, fileServerAPI } from "../services/apiUrl";
import { Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogModal from "./BlogModal";

export default function BlogEdit() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = React.useState("Write your blog post here...");
  const [selectedTab, setSelectedTab] = useState("write");
  const [file, setFileUpload] = useState();
  const [filename, setFileUploadFilename] = useState();
  const [title, setTitle] = useState();
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

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

  const { id } = useParams();

  const getOneBlog = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/blog/one/${id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response);
        setTitle(response.data.DATA.title);
        setContent(response.data.DATA.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateBlog = async () => {
    await axios({
      method: "PUT",
      url: `${apiURL}/blog/update/`,
      headers: {
        Authorization: token,
      },
      data: {
        id,
        title,
        content,
        image: filename,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showDeleteBlogConfirm = () => {
    setShowModal(true);
  };
  const hideBlog = () => {
    setShowModal(false);
  };
  const deleteBlog = async () => {
    await axios({
      method: "DELETE",
      url: `${apiURL}/blog/delete/`,
      headers: {
        Authorization: token,
      },
      data: {
        id,
      },
    })
      .then((response) => {
        setShowModal(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOneBlog();
  }, []);

  return (
    <div className="container" style={{ width: "60%", margin: "auto" }}>
      <Typography variant="h5" mb={2}>
        Modification d'article - {title}
      </Typography>
      <TextField
        value={title}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        defaultValue="Title"
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
        <Button variant="contained" className="save-btn" onClick={updateBlog}>
          {!loading ? (
            <span> Enregistrer </span>
          ) : (
            <LoadingButton
              className="loadGenerateButton"
              loading
            ></LoadingButton>
          )}
        </Button>
        <Button
          variant="contained"
          className="save-btn"
          sx={{ marginLeft: "1rem" }}
          onClick={showDeleteBlogConfirm}
        >
          {!loading ? (
            <span> Supprimer </span>
          ) : (
            <LoadingButton
              className="loadGenerateButton"
              loading
            ></LoadingButton>
          )}
        </Button>
      </div>
      {showModal && (
        <BlogModal
          title={title}
          open={showModal}
          toggleModal={hideBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  );
}
