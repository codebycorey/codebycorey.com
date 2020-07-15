import Head from 'next/head';
import Link from 'next/link';

const name: string = 'Corey O\'Donnell';
export const siteTitle: string = 'Corey O\'Donnell';

interface Props {
    children: React.ReactNode,
    home?: boolean;
}

export default function Layout({ children, home }: Props) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Software Development Blog" />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header>
                {home ? (
                    <>
                        <img
                            src="/images/profile.png"
                            alt={name}
                        />
                        <h1>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <img
                                    src="/images/profile.png"
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2>
                            <Link href="/">
                                <a>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )
            }
        </div>
    )
}
