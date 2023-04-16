import PostContent from "@/components/posts/postDetail/postContent";
import { getAllPosts, getPost } from "@/helpers/postsUtil";
import { PostType } from "@/types/postTypes";
import { GetStaticProps } from "next";
import Head from "next/head";

function PostDetailPage({ post }: { post: PostType }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const post = typeof slug === "string" && getPost(slug);
  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

export async function getStaticPaths() {
  const allSlugs = getAllPosts().map((post) => ({ params: { slug: post.slug } }));
  return { paths: allSlugs, fallback: "blocking" };
}

export default PostDetailPage;
