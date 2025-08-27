import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-4">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={10}>
            <Card className="shadow border-0">
              <Card.Img
                variant="top"
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded"
              />
              {isAuthor && (
                <div className="position-absolute top-0 end-0 m-3">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button variant="success" className="me-2">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
              <Card.Body>
                <Card.Title className="fw-bold fs-4">{post.title}</Card.Title>
                <Card.Text>{parse(post.content)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  ) : null;
}
