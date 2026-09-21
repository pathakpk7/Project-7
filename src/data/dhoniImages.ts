export interface DhoniImage {
  id: string;
  title: string;
  caption: string;
  url: string;
  fallbackUrl: string;
  year?: string;
  format?: string;
  tags?: string[];
}

export const DHONI_IMAGES: Record<string, DhoniImage> = {
  hero: {
    id: "hero",
    title: "MS Dhoni — The Captain Cool",
    caption: "The legendary #7 who redefined leadership, composure, and finishing in world cricket.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/MS_Dhoni.jpg/800px-MS_Dhoni.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    year: "2004–2024",
    tags: ["Legend", "No. 7", "Captain Cool"]
  },
  batsman: {
    id: "batsman",
    title: "The Unstoppable Powerhitter",
    caption: "From raw swashbuckling aggression (183* vs SL, 148 vs PAK) to calculated masterclass.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mahendra_Singh_Dhoni_batting.JPG/800px-Mahendra_Singh_Dhoni_batting.JPG",
    fallbackUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
    year: "2005",
    tags: ["Batting", "Helicopter Shot", "183*"]
  },
  keeper: {
    id: "keeper",
    title: "The 0.08s Miracle Behind The Stumps",
    caption: "195 international stumpings and lightning-fast reflexes that defied human reaction limits.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/MS_Dhoni_behind_Stumps.jpg/800px-MS_Dhoni_behind_Stumps.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&auto=format&fit=crop&q=80",
    year: "Reflex Record: 0.08s",
    tags: ["Wicketkeeper", "World Record", "Stumpings"]
  },
  captain: {
    id: "captain",
    title: "The ICC White-Ball Trifecta Captain",
    caption: "The only captain in history to hoist the T20 World Cup, ODI World Cup, and Champions Trophy.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/MS_Dhoni_in_2011.jpg/800px-MS_Dhoni_in_2011.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80",
    year: "2011 World Cup",
    tags: ["Captaincy", "Trifecta", "ICC Champion"]
  },
  finisher: {
    id: "finisher",
    title: "Dhoni Finishes Off in Style!",
    caption: "Unmatched ice-cold temperament in crunch death overs with over 102.71 average in successful ODI chases.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Dhoni_Feb_2012.jpg/800px-Dhoni_Feb_2012.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80",
    year: "April 2, 2011",
    tags: ["Finisher", "Death Overs", "Chasemaster"]
  },
  csk: {
    id: "csk",
    title: "Thala of Chennai Super Kings",
    caption: "5x IPL Titles, 2x CLT20 Titles, 10 IPL Finals. The heartbeat of Chennai Super Kings.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/MS_Dhoni_2016.jpg/800px-MS_Dhoni_2016.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    year: "2008–2024",
    tags: ["CSK", "Thala", "5x IPL Champion"]
  },
  padmaBhushan: {
    id: "padmaBhushan",
    title: "Lieutenant Colonel MS Dhoni",
    caption: "Conferred with India's third-highest civilian honor — the Padma Bhushan in 2018 in full military uniform.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mahendra_Singh_Dhoni_receiving_Padma_Bhushan.jpg/800px-Mahendra_Singh_Dhoni_receiving_Padma_Bhushan.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    year: "2018",
    tags: ["Padma Bhushan", "Territorial Army", "National Hero"]
  },
  legacy: {
    id: "legacy",
    title: "The Timeless Legacy of No. 7",
    caption: "Jersey #7 officially retired by the BCCI. A testament to unmatched courage, humility, and brilliance.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Mahendra_Singh_Dhoni_January_2016_%28cropped%29.jpg/800px-Mahendra_Singh_Dhoni_January_2016_%28cropped%29.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop&q=80",
    year: "Forever No. 7",
    tags: ["Immortal", "BCCI Retired #7", "Captain Cool"]
  }
};
