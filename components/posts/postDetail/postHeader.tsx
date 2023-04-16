import Image from "next/image";

import classes from "./postHeader.module.css";

function PostHeader({ title, image }: { title: string; image: string }) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} height={200} width={150} />
    </header>
  );
}

export default PostHeader;
