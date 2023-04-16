import Image from "next/image";

// ** styles
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/shota.jpg" alt="An image showing Shota" width={500} height={500} />
      </div>
      <h1>Hi, I&apos;m Shota</h1>
      <p>I blog about web development - especially frontend frameworks like React or Next.js</p>
    </section>
  );
}

export default Hero;
