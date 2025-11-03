import { getCanonicalUrl } from "@/lib/seo-utils"

const BlogPage = () => {
  // ... existing component code ...
  return <div>Blog Page Content</div>
}

export const metadata = {
  title: "Football Analysis & News | LiveBaz Blog",
  description: "Expert insights, match previews, and in-depth football analysis from our team of sports analysts.",
  keywords: "football analysis, sports news, match predictions, tactical analysis, live scores, football insights",
  authors: [{ name: "LiveBaz" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: "Football Analysis & News | LiveBaz Blog",
    description: "Expert insights, match previews, and in-depth football analysis",
    type: "website",
    url: "https://your-domain.com/blog",
    siteName: "LiveBaz",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LiveBaz Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Football Analysis & News | LiveBaz Blog",
    description: "Expert insights and in-depth football analysis",
    creator: "@livebaz",
    images: ["https://your-domain.com/twitter-image.png"],
  },
  alternates: {
    canonical: getCanonicalUrl("/blog"),
    languages: {
      en: getCanonicalUrl("/blog?lang=en"),
      fa: getCanonicalUrl("/blog?lang=fa"),
      ar: getCanonicalUrl("/blog?lang=ar"),
    },
  },
}

export default BlogPage
