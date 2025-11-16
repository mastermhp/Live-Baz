# Live-Baz
# LiveBaz - Football Live Score Website

A modern, full-featured football live score and analysis platform built with Next.js 16, featuring real-time match data from API-Sports.

## Features

- **Live Match Scores**: Real-time football match updates from API-Sports
- **League Management**: Browse all major football leagues and their matches
- **Team Information**: Detailed team statistics, recent matches, and upcoming fixtures
- **Blog Platform**: Rich article management system with multi-language support
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Responsive Design**: Beautiful UI with Tailwind CSS and Framer Motion animations

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# API-Sports Football API Configuration
API_SPORTS_KEY=your_api_sports_key_here

# MongoDB Configuration (if using database)
MONGODB_URI=your_mongodb_uri_here

# Optional: Custom API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

## Getting Started

1. **Install Dependencies**
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

2. **Configure Environment Variables**
   - Add your API-Sports key to `.env.local`
   - Get your API key from: https://www.api-football.com/

3. **Run Development Server**
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

4. **Open Browser**
   - Navigate to `http://localhost:3000`

## API Configuration

This project uses the **API-Sports Football API** (v3.football.api-sports.io).

### Available Endpoints:
- Live matches
- Upcoming fixtures
- League information
- Team statistics
- Match details

### API Key Setup:
1. Sign up at https://www.api-football.com/
2. Get your API key from the dashboard
3. Add it to `.env.local` as `API_SPORTS_KEY`

## Project Structure

\`\`\`
├── app/
│   ├── api/              # API routes
│   │   ├── matches/      # Match endpoints
│   │   ├── leagues/      # League endpoints
│   │   ├── teams/        # Team endpoints
│   │   └── admin/        # Admin endpoints
│   ├── blog/             # Blog pages
│   ├── leagues/          # Leagues page
│   ├── teams/            # Teams page
│   └── admin/            # Admin dashboard
├── components/           # React components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── public/              # Static assets
\`\`\`

## Key Pages

- **Home** (`/`): Homepage with live scores and featured content
- **Leagues** (`/leagues`): All football leagues with match listings
- **Teams** (`/teams`): Team directory with statistics and fixtures
- **Blog** (`/blog`): Football analysis and news articles
- **Admin** (`/admin`): Content management dashboard

## Technologies Used

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Database**: MongoDB
- **API**: API-Sports Football API
- **State Management**: SWR

## Admin Features

- Article management (create, edit, delete)
- Match data management
- League configuration
- Image uploads
- SEO optimization
- Multi-language support

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.
