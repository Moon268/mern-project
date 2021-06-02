import axios from "axios";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

const url = "https://my-first-mern-project.herokuapp.com";

const fetchPosts = () => axios.get(url);
const createPost = (newPost) => axios.post(url, newPost);
const updatePosts = (id, newPost) => axios.patch(`${url}/${id}`, newPost);
const deletePosts = (id) => axios.delete(`${url}/${id}`);
const likePosts = (id) => axios.patch(`${url}/${id}/like`);

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await updatePosts(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await deletePosts(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await likePosts(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
