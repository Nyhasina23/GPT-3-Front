import * as React from "react";
import "styles/markdown.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
export default function MarkdowmEditor() {
  const [value, setValue] = React.useState("Write your blog post here...");
  const [selectedTab, setSelectedTab] = useState("write");
  const [loading, setLoading] = useState(false);

  const saveBlog = () => {};

  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
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
      <Button variant="contained" className="save-btn" onClick={saveBlog}>
        {!loading ? (
          <span> Enregistrer </span>
        ) : (
          <LoadingButton className="loadGenerateButton" loading></LoadingButton>
        )}
      </Button>
    </div>
  );
}
