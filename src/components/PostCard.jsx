import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="text-decoration-none">
      <div className="card shadow-sm h-100">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title text-dark fw-bold">{title}</h5>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
