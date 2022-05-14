import { LABEL_NEW_BLOG, TOGGLE_ID_NEW_BLOG } from "../utils/constants";
import Togglable from "./Togglable";
import BlogForm from "./blogs/BlogForm";
import Blogs from "./blogs/Blogs";
import { Box } from "@mui/material";

const Home = () => (
  <div>
    <Box sx={{ m: 1 }}>
      <Togglable id={TOGGLE_ID_NEW_BLOG} buttonLabel={LABEL_NEW_BLOG}>
        <BlogForm />
      </Togglable>
    </Box>
    <Blogs />
  </div>
);

export default Home;
