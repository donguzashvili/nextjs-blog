import { PostType } from "@/types/postTypes";
import classes from "./allPosts.module.css";
import PostsGrid from "./postsGrid";

function AllPosts({ posts }: { posts: PostType[] }) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default AllPosts;
