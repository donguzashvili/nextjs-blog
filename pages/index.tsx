import FeaturedPosts from "@/components/homePage/featuredPosts";
import Hero from "@/components/homePage/hero";
import { getFeaturedPosts } from "@/helpers/postsUtil";
import { PostType } from "@/types/postTypes";
import Head from "next/head";

export default function HomePage({ featuredPosts }: { featuredPosts: PostType[] }) {
  return (
    <>
      <Head>
        <title>Shota&apos; Blog</title>
        <meta name="description" content="I post about programming and web development." />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      featuredPosts,
    },
    revalidate: 6000,
  };
}
