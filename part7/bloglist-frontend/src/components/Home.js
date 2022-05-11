import { LABEL_NEW_NOTE, TOGGLE_ID_NEW_NOTE } from "../utils/constants";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blogs from "./Blogs";

const Home = () => (
  <div>
    <Togglable id={TOGGLE_ID_NEW_NOTE} buttonLabel={LABEL_NEW_NOTE}>
      <BlogForm />
    </Togglable>
    <Blogs />
  </div>
);

export default Home;
