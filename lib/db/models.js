// MongoDB database models/schemas definition
// These define the structure of data stored in MongoDB

export const COLLECTIONS = {
  MATCHES: "matches",
  TEAMS: "teams",
  LEAGUES: "leagues",
  ARTICLES: "articles",
  PREDICTIONS: "predictions",
  USERS: "users",
  ADMIN_USERS: "admin_users",
  ANALYTICS: "analytics",
  TRANSLATIONS: "translations",
}

// Match model structure
export const MATCH_SCHEMA = {
  _id: "ObjectId",
  apiId: "string", // External API ID
  leagueId: "ObjectId",
  homeTeamId: "ObjectId",
  awayTeamId: "ObjectId",
  status: "string", // 'live', 'finished', 'upcoming', 'postponed'
  startTime: "Date",
  score: {
    home: "number",
    away: "number",
  },
  odds: {
    home: "number",
    draw: "number",
    away: "number",
  },
  winPercentages: {
    home: "number",
    draw: "number",
    away: "number",
  },
  events: [
    {
      type: "string", // 'goal', 'card', 'substitution', etc.
      player: "string",
      team: "string",
      minute: "number",
      timestamp: "Date",
    },
  ],
  statistics: {
    possession: { home: "number", away: "number" },
    shots: { home: "number", away: "number" },
    shotsOnTarget: { home: "number", away: "number" },
    passes: { home: "number", away: "number" },
    fouls: { home: "number", away: "number" },
  },
  createdAt: "Date",
  updatedAt: "Date",
}

// Team model structure
export const TEAM_SCHEMA = {
  _id: "ObjectId",
  apiId: "string", // External API ID
  name: "string",
  logo: "string", // URL to logo
  country: "string",
  leagueIds: ["ObjectId"],
  founded: "number",
  venue: {
    name: "string",
    city: "string",
    capacity: "number",
  },
  createdAt: "Date",
  updatedAt: "Date",
}

// League model structure
export const LEAGUE_SCHEMA = {
  _id: "ObjectId",
  apiId: "string", // External API ID
  name: "string",
  country: "string",
  countryCode: "string", // 'IT', 'ES', 'FR', 'PT', 'BR', etc.
  logo: "string", // URL to logo
  season: "number",
  type: "string", // 'league', 'cup', etc.
  createdAt: "Date",
  updatedAt: "Date",
}

// Article model structure
export const ARTICLE_SCHEMA = {
  _id: "ObjectId",
  title: "string",
  slug: "string", // URL-friendly identifier
  content: "string", // HTML content
  excerpt: "string",
  author: "string",
  category: "string", // 'analysis', 'news', 'prediction', etc.
  matchId: "ObjectId", // Optional: linked match
  tags: ["string"],
  featured: "boolean",
  publishedAt: "Date",
  createdAt: "Date",
  updatedAt: "Date",
  seo: {
    metaTitle: "string",
    metaDescription: "string",
    keywords: ["string"],
    ogImage: "string",
  },
  translations: {
    en: { title: "string", content: "string", excerpt: "string" },
    fa: { title: "string", content: "string", excerpt: "string" },
    ar: { title: "string", content: "string", excerpt: "string" },
  },
  views: "number",
  createdBy: "ObjectId", // Admin user ID
}

// Admin User model structure
export const ADMIN_USER_SCHEMA = {
  _id: "ObjectId",
  email: "string",
  password: "string", // Hashed
  name: "string",
  role: "string", // 'admin', 'editor', 'analyst'
  permissions: ["string"], // 'manage_articles', 'manage_matches', etc.
  active: "boolean",
  lastLogin: "Date",
  createdAt: "Date",
  updatedAt: "Date",
}

// Prediction model structure
export const PREDICTION_SCHEMA = {
  _id: "ObjectId",
  matchId: "ObjectId",
  predictedWinner: "string", // 'home', 'draw', 'away'
  confidence: "number", // 0-100
  analysis: "string",
  author: "string",
  createdAt: "Date",
  result: "string", // 'correct', 'incorrect', 'pending'
}

// Analytics model structure
export const ANALYTICS_SCHEMA = {
  _id: "ObjectId",
  date: "Date",
  pageViews: "number",
  uniqueVisitors: "number",
  articleViews: {
    articleId: "ObjectId",
    views: "number",
  },
  matchesViewed: "number",
  topArticles: ["ObjectId"],
  createdAt: "Date",
}
