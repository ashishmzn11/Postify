import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import PostCard from "../components/PostCard";
import appwriteService from "../appwrite/config";



function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

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

export default AllPosts;
