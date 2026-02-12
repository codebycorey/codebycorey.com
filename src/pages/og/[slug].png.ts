import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title } = props;

  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf');
  const fontData = fs.readFileSync(fontPath);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: 190,
          paddingRight: 190,
          paddingTop: 190,
          paddingBottom: 190,
          fontFamily: 'Inter',
          fontStyle: 'normal',
          color: 'black',
          backgroundColor: 'white',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: 130,
                letterSpacing: '-0.05em',
                lineHeight: '120px',
                whiteSpace: 'pre-wrap',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 60,
              },
              children: [
                {
                  type: 'div',
                  props: { children: 'CodeByCorey' },
                },
                {
                  type: 'div',
                  props: { children: "Corey O'Donnell" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1920 },
  });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
