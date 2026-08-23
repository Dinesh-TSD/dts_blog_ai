import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { NewsletterForm } from "./components/home/newsletter-form";
import Hero from "./components/home/hero";
import { HomePosts } from "./components/home/home-posts";

export default async function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <HomePosts />
      <NewsletterForm fullWidth={true} />
      <Footer />
    </>
  );
}
