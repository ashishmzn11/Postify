import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from ".."; // मान लो ये भी bootstrap-compatible हैं
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      if (file) appwriteService.deleteFile(post.featuredImage);

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="row">
      {/* Left Column */}
      <div className="col-md-8 mb-3">
        <div className="mb-3">
          <label className="form-label">Title :</label>
          <input
            type="text"
            placeholder="Title"
            className="form-control"
            {...register("title", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Slug :</label>
          <input
            type="text"
            placeholder="Slug"
            className="form-control"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
        </div>

        <div className="mb-3">
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="col-md-4 mb-3">
        <div className="mb-3">
          <label className="form-label">Featured Image :</label>
          <input
            type="file"
            className="form-control"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
        </div>

        {post && (
          <div className="mb-3">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="img-fluid rounded"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Status :</label>
          <select
            className="form-select"
            {...register("status", { required: true })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className={`btn ${post ? "btn-success" : "btn-primary"} w-100`}
        >
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}
