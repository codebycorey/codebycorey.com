import { FC } from 'react';
import { GetStaticProps } from 'next';

import Link from '@components/Link';
import ThemeSwitcher from '@components/ThemeSwitcher';
import { MdxFrontMatter } from '@models/MdxFrontMatter';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { Cover, Sidebar, Split, Stack } from '@components/composition';
interface HomeProps {
  posts: MdxFrontMatter[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const files: MdxFrontMatter[] = await getAllFilesFrontMatter('blog');
  const posts = files.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return { props: { posts } };
};

const Home: FC<HomeProps> = ({ posts }) => {
  const postsOrdered = posts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return (
    <main>
      <Sidebar data-direction="right">
        <Cover className="home-cover p-3">
          <Split className="home-header">
            <p>codebycorey</p>
            <ThemeSwitcher />
          </Split>
          <Stack className="cover-center">
            <h1>{"Corey O'Donnell"}</h1>
            <p className="h2">Web Developer</p>
          </Stack>
          <Stack>
            <Sidebar className="home-about-link-gap" data-direction="right">
              <Stack>
                <h2 className="h4">About</h2>
                <p>
                  I am a full-stack web developer. The tech stack I primarily
                  work with is TypeScript, React.js, Node.js. I love spending my
                  free time learning new things and improving myself. My son and
                  my wife are my everything.
                </p>
              </Stack>
              <Stack className="link-list test-util">
                <h2 className="h4">Links</h2>
                <ul role="list">
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="/ama">AMA</Link>
                  </li>
                  <li>
                    <Link href="https://twitter.com/CodeByCorey" external>
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/CodeByCorey" external>
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/in/CodeByCorey"
                      external
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </Stack>
            </Sidebar>
            <div className="copyright">
              © 2022 {"Corey O'Donnell"}. All Rights Reserved.
            </div>
          </Stack>
        </Cover>
        <Stack className="home-sidebar p-3">
          <h2>Recent Blog Posts</h2>
          {postsOrdered.map((post: MdxFrontMatter) => (
            <Link key={post.title} href={`/blog/${post.slug}`}>
              <Stack className="home-sidebar-link">
                <h3>{post.title}</h3>
                <p>{post.brief}</p>
              </Stack>
            </Link>
          ))}
          <div className="copyright">
            © 2022 {"Corey O'Donnell"}. All Rights Reserved.
          </div>
        </Stack>
      </Sidebar>
    </main>
  );
};

export default Home;
