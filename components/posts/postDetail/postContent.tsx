import PostHeader from "./postHeader";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PostType } from "@/types/postTypes";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

import classes from "./postContent.module.css";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";

SyntaxHighlighter.registerLanguage("js", js);

function PostContent({ post }: { post: PostType }) {
  if (!post) return <p>Loading...</p>;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenderers = {
    img: (image: { src: string; alt: string }) => {
      return <Image className={classes.image} src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300} />;
    },
    code: (code: any) => {
      const { className, children } = code;
      const language = className?.split("-")[1];
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      {/* @ts-ignore */}
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
