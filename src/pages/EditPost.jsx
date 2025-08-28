import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/post-form/PostForm";


function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-4">
      <Container>
        <h2 className="text-center mb-4">Edit Post</h2>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
