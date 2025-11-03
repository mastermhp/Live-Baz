// SEO utilities for blog optimization
export function generateBlogSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    image: {
      "@type": "ImageObject",
      url: article.image || "https://your-domain.com/og-image.png",
      width: 1200,
      height: 630,
    },
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      "@type": "Person",
      name: article.author || "LiveBaz Admin",
      url: "https://your-domain.com",
    },
    publisher: {
      "@type": "Organization",
      name: "LiveBaz",
      logo: {
        "@type": "ImageObject",
        url: "https://your-domain.com/logo.png",
        width: 250,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://your-domain.com/blog/${article._id}`,
    },
    keywords: article.seo?.keywords || article.tags || article.category,
    articleBody: article.content,
    articleSection: article.category,
    inLanguage: "en",
  }
}

export function generateBreadcrumbSchema(category) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://your-domain.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://your-domain.com/blog",
      },
      category && {
        "@type": "ListItem",
        position: 3,
        name: category,
        item: `https://your-domain.com/blog?category=${category.toLowerCase()}`,
      },
    ].filter(Boolean),
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LiveBaz",
    url: "https://your-domain.com",
    logo: "https://your-domain.com/logo.png",
    description: "Live football scores, predictions, and in-depth analysis",
    sameAs: ["https://twitter.com/livebaz", "https://facebook.com/livebaz", "https://instagram.com/livebaz"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-000-000-0000",
      contactType: "Customer Service",
    },
  }
}

export function generateBlogListingSchema(articles) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "LiveBaz Blog",
    description: "Football analysis, predictions, and sports insights",
    url: "https://your-domain.com/blog",
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      image: article.image,
      datePublished: article.createdAt,
      dateModified: article.updatedAt,
      author: {
        "@type": "Person",
        name: article.author || "Admin",
      },
      url: `https://your-domain.com/blog/${article._id}`,
    })),
  }
}

// Generate canonical URL
export function getCanonicalUrl(pathname) {
  return `https://your-domain.com${pathname}`
}

// Generate Open Graph meta tags
export function generateOpenGraphTags(article) {
  return {
    "og:title": article.seo?.metaTitle || article.title,
    "og:description": article.seo?.metaDescription || article.excerpt,
    "og:image": article.image || "https://your-domain.com/og-image.png",
    "og:type": "article",
    "og:url": `https://your-domain.com/blog/${article._id}`,
    "article:published_time": article.publishedAt || article.createdAt,
    "article:author": article.author || "LiveBaz",
    "article:section": article.category,
  }
}

// Generate Twitter Card tags
export function generateTwitterCardTags(article) {
  return {
    "twitter:card": "summary_large_image",
    "twitter:title": article.seo?.metaTitle || article.title,
    "twitter:description": article.seo?.metaDescription || article.excerpt,
    "twitter:image": article.image || "https://your-domain.com/og-image.png",
    "twitter:creator": "@livebaz",
  }
}
