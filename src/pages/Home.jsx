import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="py-4 mt-4 text-center">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1 className="h3 fw-bold text-muted">
                Login to read posts
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-4">
      <Container>
        <Row>
          {posts.map((post) => (
            <Col key={post.$id} md={3} sm={6} xs={12} className="mb-4">
              <PostCard {...post} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
