import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APIfetch, updateCount } from "./redux/APISlice";

function App() {
  const API = useSelector((state) => state.API);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [updateID, setUpdateID] = useState(0);
  const [postID, setPostID] = useState(API.post[API.post?.length - 1]?.id);

  useEffect(() => {
    axios
      .get("http://localhost:3030/posts")
      .then((response) => {
        return dispatch(APIfetch(response.data));
      })
      .catch((error) => error.message);
  }, []);

  function addPost(e) {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      alert("Please Fill all the fields");
    } else {
      const data = {
        id: postID,
        title,
        body,
      };
      axios
        .post("http://localhost:3030/posts", data)
        .then((response) => {
          return axios
            .get("http://localhost:3030/posts")
            .then((response) => {
              return dispatch(APIfetch(response.data));
            })
            .catch((error) => error.message);
        })
        .catch((error) => error.message);
      setTitle("");
      setBody("");
      setPostID((prev) => prev + 1);
    }
  }

  function updatePost(post) {
    setTitle(post.title);
    setBody(post.body);
    dispatch(updateCount(1));
    setUpdateID(post.id);
  }

  function update(e) {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      alert("Please Fill all the fields");
    } else {
      const data = {
        title,
        body,
      };

      axios
        .put(`http://localhost:3030/posts/${updateID}`, data)
        .then((response) => {
          return axios
            .get("http://localhost:3030/posts")
            .then((response) => {
              return dispatch(APIfetch(response.data));
            })
            .catch((error) => error.message);
        })
        .catch((error) => error.message);
      dispatch(updateCount(0));
      setTitle("");
      setBody("");
    }
  }

  function deletePost(id) {
    axios
      .delete(`http://localhost:3030/posts/${id}`)
      .then((response) => {
        return axios
          .get("http://localhost:3030/posts")
          .then((response) => {
            return dispatch(APIfetch(response.data));
          })
          .catch((error) => error.message);
      })
      .catch((error) => error.message);
  }

  return (
    <div className="App">
      <form>
        <label>Title : </label>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label>Body : </label>
        <textarea
          type="text"
          placeholder="Enter Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <br />
        <br />
        {API.count === 0 ? (
          <button onClick={addPost}>Add</button>
        ) : (
          <button onClick={update}>Update</button>
        )}
      </form>
      {API.post.map((post) => {
        return (
          <div key={post.id}>
            <p>
              {post.id}. {post.title}
            </p>
            <p>{post.body}</p>
            <button onClick={() => updatePost(post)}>Update</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
