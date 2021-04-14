import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function BlogForms() {
  const {
    register: addPost,
    handleSubmit: handleAdd,
    errors: addErrors,
  } = useForm();
  const {
    register: updatePost,
    handleSubmit: handleUpdate,
    errors: updateErrors,
  } = useForm();

  const {
    register: deletePost,
    handleSubmit: handleDelete,
    errors: deleteErrors,
  } = useForm();

  const onAddPost = async (post) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/blog`,
      post
    );
    alert(data);
  };

  const onUpdatePost = async (post) => {
    for (const [key, value] of Object.entries(post)) {
      if (!value || value.length <= 0) {
        delete post[key];
      }
    }
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/blog/${post.id}`,
        post
      );
      alert(data);
    } catch (err) {
      alert("No post found to update, check the ID please");
    }
  };

  const onDelPost = async (post) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/blog/${post.id}`
      );
      alert(data);
    } catch (err) {
      alert("No post found to be removed, check the ID please");
    }
  };
  return (
    <Row>
      <Col lg={6}>
        <Form onSubmit={handleAdd(onAddPost)} className="form">
          <h4>Add Post</h4>
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              id="title"
              name="title"
              ref={addPost({ required: true })}
            />
            {addErrors.title && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="author">Author</Form.Label>
            <Form.Control
              type="text"
              id="author"
              name="author"
              ref={addPost({ required: true })}
            />
            {addErrors.author && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="content">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="content"
              name="content"
              ref={addPost({ required: true })}
            />
            {addErrors.content && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="src">Image Source</Form.Label>
            <Form.Control
              type="text"
              id="src"
              name="src"
              ref={addPost({ required: true })}
            />
            {addErrors.src && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="p-2 m-auto" type="submit">
              Add Post
            </Button>
          </div>
        </Form>
        <Form className="form" onSubmit={handleDelete(onDelPost)}>
          <h4>Delete Post</h4>
          <Form.Group>
            <Form.Label htmlFor="id2">Post ID</Form.Label>
            <Form.Control
              type="text"
              id="id2"
              name="id"
              ref={deletePost({ required: true })}
            />
            {deleteErrors.id && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="p-2 m-auto" type="submit">
              Delete Post
            </Button>
          </div>
        </Form>
      </Col>
      <Col lg={6}>
        <Form onSubmit={handleUpdate(onUpdatePost)} className="form">
          <h4>Update Post</h4>
          <Form.Group>
            <Form.Label htmlFor="id">Post ID</Form.Label>
            <Form.Control
              type="text"
              id="id"
              name="id"
              ref={updatePost({ required: true })}
            />
            {updateErrors.id && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="title2">Post Title</Form.Label>
            <Form.Control
              type="text"
              id="title2"
              name="title"
              ref={updatePost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="author2">Post Author</Form.Label>
            <Form.Control
              type="text"
              id="author2"
              name="author"
              ref={updatePost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="content2">Post Content</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="content2"
              name="content"
              ref={updatePost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="src">Post Image</Form.Label>
            <Form.Control type="text" id="src" name="src" ref={updatePost} />
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="p-2 m-auto" type="submit">
              Update Post
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default BlogForms;
