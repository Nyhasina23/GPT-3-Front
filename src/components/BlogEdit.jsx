import * as React from "react";
import "styles/markdown.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
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
import { showNavbar } from "features/snackbar.slice";
import "styles/blogEdit.css";

export default function BlogEdit() {
  const [loading, setLoading] = useState(false);
  const [loadingDeleteBtn, setLoadingDeleteBtn] = useState(false);
  const [content, setContent] = React.useState("Write your blog post here...");
  const [selectedTab, setSelectedTab] = useState("write");
  const [file, setFileUpload] = useState();
  const [title, setTitle] = useState();
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const uploadFile = (event) => {
    setFileUpload(event.target?.files);
  };

  const updateBlog = async () => {
    const formData = new FormData();
    setLoading(true);
    if (!file) {
      dispatch(
        showNavbar({
          message: "Veuillez ajouter une image",
          type: "FAIL",
          open: true,
        })
      );
      setLoading(false);
      return;
    } else {
      formData.append("images", file[0]);
      await axios({
        method: "POST",
        url: `${fileServerAPI}/upload`,
        data: formData,
      })
        .then(async (res) => {
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
              image: res?.data[0],
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
              message: error.response.data,
              type: "FAIL",
              open: true,
            })
          );
          setLoading(false);
        });
    }
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
        setTitle(response.data.DATA.title);
        setContent(response.data.DATA.content);
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
  };

  const showDeleteBlogConfirm = () => {
    setShowModal(true);
  };
  const hideBlog = () => {
    setShowModal(false);
  };
  const deleteBlog = async () => {
    setLoadingDeleteBtn(true);
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
        dispatch(
          showNavbar({
            message: response.data.MESSAGE,
            type: "SUCCESS",
            open: true,
          })
        );
        setLoadingDeleteBtn(false);
        setShowModal(false);
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
        setLoadingDeleteBtn(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOneBlog();
  }, []);

  return (
    <div className="container edit" style={{ width: "60%", margin: "auto" }}>
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
      <div className="button-container">
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
          {!loadingDeleteBtn ? (
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
