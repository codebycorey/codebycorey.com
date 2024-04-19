import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title');
  const font = fetch(
    new URL('/public/fonts/Inter-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
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
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 130,
            letterSpacing: '-0.05em',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {postTitle}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 60,
          }}
        >
          <div>CodeByCorey</div>
          <div>{"Corey O'Donnell"}</div>
        </div>
      </div>
    ),
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
}
