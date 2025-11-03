import { getArticle, getRelatedArticles } from "@/lib/api"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogArticleDetail from "@/components/blog-article-detail"
import { generateBlogSchema, generateBreadcrumbSchema, getCanonicalUrl } from "@/lib/seo-utils"

export async function generateMetadata({ params }) {
  const article = await getArticle(params.id)

  if (!article) {
    return {
      title: "Article Not Found - LiveBaz",
      description: "The article you are looking for could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = article.seo?.metaTitle || article.title
  const description = article.seo?.metaDescription || article.excerpt
  const keywords = article.seo?.keywords || article.tags || article.category

  return {
    title: `${title} | LiveBaz`,
    description,
    keywords,
    authors: [{ name: article.author || "LiveBaz" }],
    creator: article.author || "LiveBaz",
    robots: {
      index: article.status === "published",
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: getCanonicalUrl(`/blog/${params.id}`),
      images: [
        {
          url: article.image || "https://your-domain.com/og-image.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt || article.createdAt,
      modifiedTime: article.updatedAt || article.createdAt,
      authors: [article.author || "LiveBaz"],
      tags: article.tags?.split(",").map((t) => t.trim()) || [article.category],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@livebaz",
      images: [article.image || "https://your-domain.com/twitter-image.png"],
    },
    alternates: {
      canonical: getCanonicalUrl(`/blog/${params.id}`),
      languages: {
        en: getCanonicalUrl(`/blog/${params.id}?lang=en`),
        fa: getCanonicalUrl(`/blog/${params.id}?lang=fa`),
        ar: getCanonicalUrl(`/blog/${params.id}?lang=ar`),
      },
    },
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.id)

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <a href="/blog" className="text-primary hover:underline font-semibold">
              Back to Articles
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedArticles = await getRelatedArticles(article.category)

  // Generate structured data
  const articleSchema = generateBlogSchema(article)
  const breadcrumbSchema = generateBreadcrumbSchema(article.category)

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />
      <BlogArticleDetail article={article} relatedArticles={relatedArticles} />
      <Footer />
    </div>
  )
}
