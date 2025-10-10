import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Share2, Bookmark } from "lucide-react"
import Link from "next/link"

export default function ArticlePage({ params }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8 animate-slide-up">
            <Badge variant="default" className="mb-4 bg-primary">
              Analysis
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Manchester City vs Liverpool: Tactical Analysis
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              A deep dive into the tactical battle between two Premier League giants. How Guardiola's system matches up
              against Klopp's high press.
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">John Smith</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>January 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video relative overflow-hidden rounded-lg bg-muted mb-8 animate-fade-in">
            <img src="/football-tactical-analysis-manchester-city-liverpo.jpg" alt="Article featured image" className="object-cover w-full h-full" />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed mb-6">
              The clash between Manchester City and Liverpool has become one of the most anticipated fixtures in world
              football. Both teams represent the pinnacle of modern tactical evolution, with Pep Guardiola and Jürgen
              Klopp implementing systems that have revolutionized the game.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Guardiola's Possession Dominance</h2>
            <p className="leading-relaxed mb-6">
              Manchester City's approach under Guardiola is built on controlling possession and territory. The team
              typically operates in a 4-3-3 formation that morphs into various shapes depending on the phase of play.
              Kevin De Bruyne's role as the advanced midfielder is crucial, providing the creative spark that unlocks
              defenses.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Klopp's High-Intensity Press</h2>
            <p className="leading-relaxed mb-6">
              Liverpool's gegenpressing system is designed to win the ball back immediately after losing it. This
              high-intensity approach requires exceptional fitness levels and tactical discipline. The front three of
              Salah, Núñez, and Gakpo are key to this system, pressing from the front and forcing errors.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Key Tactical Battles</h2>
            <p className="leading-relaxed mb-6">
              The midfield battle will be crucial. City's technical superiority in possession will be tested against
              Liverpool's intensity without the ball. Rodri's ability to shield the defense and progress play will be
              vital, while Liverpool's midfield trio must disrupt City's rhythm.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Prediction</h2>
            <p className="leading-relaxed mb-6">
              This match promises to be a tactical masterclass. City's home advantage and recent form give them a slight
              edge, but Liverpool's ability to raise their game in big matches means this could go either way. Expect
              goals, intensity, and world-class football.
            </p>
          </div>

          {/* Related Match */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="font-bold mb-4">Related Match</h3>
            <Link href="/match/1">
              <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
                      <span className="text-xs font-bold">MCI</span>
                    </div>
                    <span className="text-sm font-semibold">Man City</span>
                  </div>
                  <div className="text-center px-4">
                    <Badge variant="default" className="bg-success mb-2">
                      LIVE
                    </Badge>
                    <div className="text-2xl font-bold">2 - 1</div>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
                      <span className="text-xs font-bold">LIV</span>
                    </div>
                    <span className="text-sm font-semibold">Liverpool</span>
                  </div>
                </div>
                <Button variant="outline">View Match</Button>
              </div>
            </Link>
          </Card>

          {/* More Articles */}
          <div>
            <h3 className="text-2xl font-bold mb-6">More Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Link key={i} href={`/blog/${i + 1}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={`/football-analysis-article-.jpg?height=300&width=500&query=football analysis article ${i}`}
                        alt="Related article"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        Preview
                      </Badge>
                      <h4 className="font-bold mb-2 line-clamp-2">
                        {i === 1
                          ? "El Clásico Preview: Real Madrid vs Barcelona"
                          : "Top 5 Strikers to Watch This Season"}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Expert analysis and predictions for the upcoming match.
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
