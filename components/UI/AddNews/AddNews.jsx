import React, { useState } from "react";
import { Button } from "@mui/material";
import { BsCloudArrowUpFill } from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddNews = ({ changeState }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [textError, setTextError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");

  const chooseImage = () => {
    const btn = document.getElementById("btn");

    btn.click();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("title", title);
    fd.append("content", comment);
    fd.append("image", image);

    fetch("https://e-school-syr.herokuapp.com/admin/add/announcement", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: fd,
    }).then((res) => {
      if (res.ok) {
        return res.json().then((e) => {
          setTypeError("success");
          setTextError(e.message);
          setComment("");
          setImage("");
          setTitle("");
          changeState();
          window.location.reload();
        });
      } else {
        return res.json().then((e) => {
          setTypeError("error");
          setTextError(e.message);
          setOpen(true);
        });
      }
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="form d-flex justify-content-center flex-column p-4"
    >
      <input
        type="text"
        className="title mb-4 p-2"
        placeholder="Title"
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        className="comment mb-4 p-2"
        placeholder="content"
        rows="4"
        required
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div
        className="image-file d-flex justify-content-center p-4
        mb-3"
        onClick={chooseImage}
      >
        <BsCloudArrowUpFill color="#4fa6f7" size="5rem" />
      </div>
      <input
        type="file"
        id="btn"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <Button type="submit" variant="contained" className="m-auto">
        Add Announcement
      </Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={typeError}
          sx={{ width: "100%" }}
        >
          {textError}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AddNews;
