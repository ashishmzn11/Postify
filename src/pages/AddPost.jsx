import React from "react";
import Container from "react-bootstrap/Container";
import PostForm from "../components/PostForm";

function AddPost() {
  return (
    <div className="py-4">
      <Container>
        <h2 className="text-center mb-4">Add New Post</h2>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
