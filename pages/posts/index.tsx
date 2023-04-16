import AllPosts from "@/components/posts/allPosts";
import { getAllPosts } from "@/helpers/postsUtil";
import { PostType } from "@/types/postTypes";
import Head from "next/head";

function AllPostsPage({ posts }: { posts: PostType[] }) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all programming-related tutorials and posts!" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default AllPostsPage;
