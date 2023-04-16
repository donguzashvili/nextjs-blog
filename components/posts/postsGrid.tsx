import { PostType } from "@/types/postTypes";
import PostItem from "./postItem";

import classes from "./postsGrid.module.css";

function PostsGrid({ posts }: { posts: PostType[] }) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} title={post.title} date={post.date} excerpt={post.excerpt} image={post.image} slug={post.slug} />
      ))}
    </ul>
  );
}

export default PostsGrid;
