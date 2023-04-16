import { PostType } from "@/types/postTypes";
import PostsGrid from "../posts/postsGrid";
import classes from "./featuredPosts.module.css";

function FeaturedPosts({ posts }: { posts: PostType[] }) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
