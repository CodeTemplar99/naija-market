// All mock data for the app lives here so every page can share it.

export const CATEGORIES = [
  'Breaking', 'New', 'Politics', 'Sports', 'Crypto', 'Finance',
  'Geopolitics', 'Earnings', 'Tech', 'Culture', 'World',
  'Economy', 'Climate & Science', 'Mentions', 'Elections', 'More'
]

// Helper: generate mock chart data for a given number of points and options
export function generateChartData(numPoints, options, seed = 42) {
  let rng = seed
  const next = () => { rng = (rng * 16807) % 2147483647; return (rng % 100) / 100 }

  const data = []
  const now = Date.now()
  const interval = (7 * 24 * 60 * 60 * 1000) / numPoints // spread over period

  const prices = {}
  options.forEach((opt, i) => { prices[opt] = 30 + (i * 15) + next() * 20 })

  for (let i = 0; i < numPoints; i++)
  {
    const point = { time: now - (numPoints - i) * interval }
    options.forEach(opt => {
      prices[opt] = Math.max(2, Math.min(98, prices[opt] + (next() - 0.48) * 6))
      point[opt] = Math.round(prices[opt] * 10) / 10
    })
    data.push(point)
  }
  return data
}

// Smart end date display
export function getTimeRemaining(endTimestamp) {
  const now = Date.now()
  const diff = endTimestamp - now
  if (diff <= 0) return { label: 'Ended', urgent: false }
  const hours = diff / (1000 * 60 * 60)
  const days = hours / 24

  if (hours <= 2)
  {
    const mins = Math.floor(diff / 60000)
    const secs = Math.floor((diff % 60000) / 1000)
    return { label: `${mins}m ${secs}s`, urgent: true, countdown: true }
  }
  if (hours <= 5) return { label: `in ${Math.floor(hours)}h ${Math.floor((hours % 1) * 60)}m`, urgent: true }
  if (hours <= 12) return { label: `in ${Math.floor(hours)} hours`, urgent: true }
  if (hours <= 24) return { label: 'Ending today', urgent: true }
  if (days <= 2) return { label: 'Tomorrow', urgent: false }
  if (days <= 7) return { label: `in ${Math.round(days)} days`, urgent: false }
  // Format date
  const d = new Date(endTimestamp)
  return { label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), urgent: false }
}

export const MARKETS = [
  {
    id: 1,
    question: "Will the CBN raise the interest rate at the next MPC meeting?",
    category: "Economy",
    type: "binary",
    volume: "42.5M",
    liquidity: "₦18.2M",
    traders: 12400,
    yesPrice: 65,
    noPrice: 35,
    change24h: +3.2,
    image: "https://images.unsplash.com/photo-1621213327685-612668e1a107?auto=format&fit=crop&w=500&q=80",
    endDate: "Mar 15, 2026",
    endTimestamp: new Date('2026-03-15').getTime(),
    isLive: true,
    isFeatured: true,
    comments: 89,
    description: "This market resolves to 'Yes' if the Central Bank of Nigeria announces an increase in the MPR during the next MPC meeting scheduled for March 2026.",
    rules: ["Resolves based on official CBN press release.", "Meeting must occur before end of Q1 2026.", "Any delay beyond Mar 31 results in void."],
    creator: "NairaWatch"
  },
  {
    id: 2,
    question: "Will Nigeria qualify for the 2026 FIFA World Cup?",
    category: "Sports",
    type: "binary",
    volume: "110M",
    liquidity: "₦45M",
    traders: 45200,
    yesPrice: 82,
    noPrice: 18,
    change24h: +1.5,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=500&q=80",
    endDate: "Jun 20, 2026",
    endTimestamp: new Date('2026-06-20').getTime(),
    isLive: true,
    isFeatured: true,
    comments: 342,
    description: "Resolves Yes if the Super Eagles officially qualify for the 2026 FIFA World Cup finals.",
    rules: ["Based on FIFA official standings.", "Must qualify through CAF qualifiers."],
    creator: "NaijaFoot"
  },
  {
    id: 3,
    question: "Who will be the APC presidential flag bearer in 2027?",
    category: "Politics",
    type: "multi",
    volume: "95M",
    liquidity: "₦32M",
    traders: 34000,
    change24h: +4.8,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=500&q=80",
    endDate: "Dec 31, 2026",
    endTimestamp: new Date('2026-12-31').getTime(),
    isLive: true,
    isFeatured: true,
    comments: 612,
    options: [
      { name: "Kashim Shettima", price: 32, color: "#00C853" },
      { name: "Babajide Sanwo-Olu", price: 28, color: "#4096FF" },
      { name: "Adams Oshiomhole", price: 18, color: "#FFD600" },
      { name: "Rotimi Amaechi", price: 14, color: "#FF6D00" },
      { name: "Others", price: 8, color: "#AB47BC" },
    ],
    description: "This market predicts who will emerge as the All Progressives Congress (APC) presidential flag bearer for the 2027 general elections.",
    rules: ["Resolves based on official APC primary results.", "If primaries don't hold by Dec 31, market voids.", "Consensus candidate counts."],
    creator: "AsoVilla"
  },
  {
    id: 4,
    question: "Will the Naira trade below ₦1,200/$ by December 2026?",
    category: "Finance",
    type: "binary",
    volume: "85M",
    liquidity: "₦22M",
    traders: 22300,
    yesPrice: 20,
    noPrice: 80,
    change24h: -0.5,
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=500&q=80",
    endDate: "Dec 31, 2026",
    endTimestamp: new Date('2026-12-31').getTime(),
    isLive: true,
    isFeatured: true,
    comments: 410,
    description: "Resolves Yes if the official CBN exchange rate for USD/NGN falls below 1200 at any point before December 31, 2026.",
    rules: ["Uses CBN official rate, not parallel market.", "Must sustain below 1200 for 24h."],
    creator: "ForexNG"
  },
  {
    id: 5,
    question: "Who will be the AFCON top scorer?",
    category: "Sports",
    type: "multi",
    volume: "58M",
    liquidity: "₦20M",
    traders: 25000,
    change24h: +2.4,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=500&q=80",
    endDate: "Feb 28, 2026",
    endTimestamp: Date.now() + 1000 * 60 * 60 * 4.5, // 4.5 hours from now
    isLive: true,
    isFeatured: true,
    comments: 298,
    options: [
      { name: "Victor Osimhen", price: 38, color: "#00C853" },
      { name: "Mohamed Salah", price: 25, color: "#FF3D00" },
      { name: "Sadio Mané", price: 15, color: "#FFD600" },
      { name: "Nicolas Pépé", price: 12, color: "#4096FF" },
      { name: "Others", price: 10, color: "#AB47BC" },
    ],
    description: "This market predicts who will finish as the top goal scorer at the Africa Cup of Nations tournament.",
    rules: ["Based on official CAF statistics.", "If tied, player with fewer minutes wins.", "Own goals don't count."],
    creator: "NaijaFoot"
  },
  {
    id: 6,
    question: "Will Dangote Refinery reach full capacity by Q3 2026?",
    category: "Earnings",
    type: "binary",
    volume: "35M",
    liquidity: "₦10M",
    traders: 4100,
    yesPrice: 28,
    noPrice: 72,
    change24h: +1.2,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80",
    endDate: "Sep 30, 2026",
    endTimestamp: new Date('2026-09-30').getTime(),
    isLive: true,
    isFeatured: false,
    comments: 67,
    description: "Resolves Yes if the Dangote Petroleum Refinery officially reaches its full 650,000 barrels/day refining capacity.",
    rules: ["Based on official Dangote Group statement.", "Must be independently verified."],
    creator: "EnergyNG"
  },
  {
    id: 7,
    question: "Will Bitcoin exceed $150,000 before June 2026?",
    category: "Crypto",
    type: "binary",
    volume: "220M",
    liquidity: "₦95M",
    traders: 78000,
    yesPrice: 58,
    noPrice: 42,
    change24h: +5.3,
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=500&q=80",
    endDate: "Jun 1, 2026",
    endTimestamp: new Date('2026-06-01').getTime(),
    isLive: true,
    isFeatured: true,
    comments: 1200,
    description: "Resolves Yes if BTC/USD exceeds $150,000 on any major exchange before June 1, 2026.",
    rules: ["Price must appear on CoinGecko.", "Must sustain for 1 hour."],
    creator: "CryptoNaija"
  },
  {
    id: 8,
    question: "Which Nigerian startup will be the next tech unicorn?",
    category: "Tech",
    type: "multi",
    volume: "42M",
    liquidity: "₦14M",
    traders: 8900,
    change24h: +1.8,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80",
    endDate: "Dec 31, 2026",
    endTimestamp: new Date('2026-12-31').getTime(),
    isLive: true,
    isFeatured: false,
    comments: 156,
    options: [
      { name: "Moniepoint", price: 35, color: "#00C853" },
      { name: "Kuda Bank", price: 22, color: "#4096FF" },
      { name: "Piggyvest", price: 18, color: "#FFD600" },
      { name: "Cowrywise", price: 15, color: "#FF6D00" },
      { name: "Others", price: 10, color: "#AB47BC" },
    ],
    description: "Predicts which Nigerian-founded fintech startup will next achieve a $1B+ valuation in a funding round.",
    rules: ["Valuation must be reported by TechCrunch or Bloomberg.", "Company must be Nigerian-founded.", "Acqui-hires don't count."],
    creator: "TechLagos"
  },
  {
    id: 9,
    question: "Will there be a cabinet reshuffle before August 2026?",
    category: "Politics",
    type: "binary",
    volume: "52M",
    liquidity: "₦12M",
    traders: 19500,
    yesPrice: 72,
    noPrice: 28,
    change24h: +4.1,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=500&q=80",
    endDate: "Aug 1, 2026",
    endTimestamp: Date.now() + 1000 * 60 * 60 * 1.5, // 1.5 hours from now — countdown
    isLive: true,
    isFeatured: true,
    comments: 380,
    description: "Resolves Yes if President Tinubu announces any changes to the Federal Executive Council (cabinet) before August 1, 2026.",
    rules: ["Must be officially gazetted.", "At least 3 ministers must change."],
    creator: "AsoVilla"
  },
  {
    id: 10,
    question: "Will Ethereum flip Bitcoin in market cap by 2026?",
    category: "Crypto",
    type: "binary",
    volume: "180M",
    liquidity: "₦60M",
    traders: 55000,
    yesPrice: 12,
    noPrice: 88,
    change24h: -1.0,
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&w=500&q=80",
    endDate: "Dec 31, 2026",
    endTimestamp: new Date('2026-12-31').getTime(),
    isLive: false,
    isFeatured: false,
    comments: 890,
    description: "Resolves Yes if Ethereum's market capitalization exceeds Bitcoin's at any point during 2026.",
    rules: ["Based on CoinGecko data.", "Must sustain for 24h."],
    creator: "CryptoNaija"
  },
  {
    id: 11,
    question: "Will Nigeria host a global climate summit in 2026?",
    category: "Climate & Science",
    type: "binary",
    volume: "8M",
    liquidity: "₦2M",
    traders: 1800,
    yesPrice: 15,
    noPrice: 85,
    change24h: 0,
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f31?auto=format&fit=crop&w=500&q=80",
    endDate: "Dec 31, 2026",
    endTimestamp: new Date('2026-12-31').getTime(),
    isLive: false,
    isFeatured: false,
    comments: 12,
    description: "Resolves Yes if Nigeria officially hosts any internationally recognized climate or science summit during 2026.",
    rules: ["Must have UN or AU recognition.", "At least 20 nations participating."],
    creator: "GreenNG"
  },
  {
    id: 12,
    question: "Will the Super Eagles win the next AFCON?",
    category: "Sports",
    type: "binary",
    volume: "95M",
    liquidity: "₦35M",
    traders: 38000,
    yesPrice: 30,
    noPrice: 70,
    change24h: +2.0,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=500&q=80",
    endDate: "Feb 28, 2026",
    endTimestamp: Date.now() + 1000 * 60 * 60 * 10, // 10 hours
    isLive: true,
    isFeatured: true,
    comments: 560,
    description: "Resolves Yes if the Nigerian Super Eagles win the Africa Cup of Nations tournament.",
    rules: ["Based on official CAF results.", "Must win the final match."],
    creator: "NaijaFoot"
  },
  {
    id: 13,
    question: "Will a new state be created in Nigeria before 2027?",
    category: "Geopolitics",
    type: "binary",
    volume: "12M",
    liquidity: "₦3M",
    traders: 2100,
    yesPrice: 5,
    noPrice: 95,
    change24h: 0,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=500&q=80",
    endDate: "Dec 31, 2026",
    endTimestamp: new Date('2026-12-31').getTime(),
    isLive: false,
    isFeatured: false,
    comments: 34,
    description: "Resolves Yes if the National Assembly passes and the President signs a bill creating at least one new state.",
    rules: ["Must be signed into law.", "Constitutional amendment required."],
    creator: "NASSnews"
  },
  {
    id: 14,
    question: "Who will win the 2027 PDP presidential primary?",
    category: "Elections",
    type: "multi",
    volume: "72M",
    liquidity: "₦28M",
    traders: 22500,
    change24h: +3.1,
    image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?auto=format&fit=crop&w=500&q=80",
    endDate: "Nov 30, 2026",
    endTimestamp: new Date('2026-11-30').getTime(),
    isLive: true,
    isFeatured: true,
    comments: 445,
    options: [
      { name: "Atiku Abubakar", price: 30, color: "#00C853" },
      { name: "Peter Obi", price: 28, color: "#4096FF" },
      { name: "Nyesom Wike", price: 22, color: "#FF3D00" },
      { name: "Aminu Tambuwal", price: 12, color: "#FFD600" },
      { name: "Others", price: 8, color: "#AB47BC" },
    ],
    description: "Predicts who will emerge as the People's Democratic Party (PDP) presidential candidate for 2027.",
    rules: ["Resolves based on PDP official primary results.", "If primary is delayed beyond Dec 2026, market voids."],
    creator: "INECwatch"
  },
  {
    id: 15,
    question: "Will NaijaPredict reach 100,000 users by Q4 2026?",
    category: "Mentions",
    type: "binary",
    volume: "5M",
    liquidity: "₦1.5M",
    traders: 3500,
    yesPrice: 55,
    noPrice: 45,
    change24h: +7.0,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
    endDate: "Oct 1, 2026",
    endTimestamp: new Date('2026-10-01').getTime(),
    isLive: true,
    isFeatured: false,
    comments: 78,
    description: "A meta-market! Resolves Yes if this platform officially reaches 100,000 registered users.",
    rules: ["Based on platform analytics.", "Verified by third-party audit."],
    creator: "NaijaPredict"
  },
  {
    id: 16,
    question: "Will crude oil price exceed $100/barrel in Q2 2026?",
    category: "World",
    type: "binary",
    volume: "75M",
    liquidity: "₦25M",
    traders: 18000,
    yesPrice: 42,
    noPrice: 58,
    change24h: -1.8,
    image: "https://images.unsplash.com/photo-1611273426858-450d8e80e916?auto=format&fit=crop&w=500&q=80",
    endDate: "Jun 30, 2026",
    endTimestamp: new Date('2026-06-30').getTime(),
    isLive: true,
    isFeatured: false,
    comments: 230,
    description: "Resolves Yes if Brent crude oil exceeds $100/barrel at any point during Q2 2026.",
    rules: ["Based on Bloomberg/Reuters data.", "Must sustain for 24h."],
    creator: "OilWatch"
  },
  {
    id: 17,
    question: "Will Wizkid drop a new album before July 2026?",
    category: "Culture",
    type: "binary",
    volume: "28M",
    liquidity: "₦8.5M",
    traders: 8500,
    yesPrice: 45,
    noPrice: 55,
    change24h: -2.1,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    endDate: "Jun 30, 2026",
    endTimestamp: Date.now() + 1000 * 60 * 60 * 18, // 18 hours
    isLive: false,
    isFeatured: false,
    comments: 156,
    description: "Resolves Yes if Wizkid officially releases a full-length studio album on any major streaming platform before July 1, 2026.",
    rules: ["Must be on Spotify/Apple Music.", "Singles don't count.", "EP with 7+ tracks counts."],
    creator: "StarBoi"
  },
  {
    id: 18,
    question: "Will Burna Boy win a Grammy in 2026?",
    category: "Culture",
    type: "binary",
    volume: "65M",
    liquidity: "₦15M",
    traders: 15100,
    yesPrice: 35,
    noPrice: 65,
    change24h: +0.8,
    image: "https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&w=500&q=80",
    endDate: "Feb 10, 2026",
    endTimestamp: Date.now() + 1000 * 60 * 45, // 45 mins — deep countdown
    isLive: true,
    isFeatured: false,
    comments: 201,
    description: "Resolves Yes if Burna Boy wins any Grammy award at the 2026 ceremony.",
    rules: ["Any Grammy category counts.", "Based on official Grammy.com results."],
    creator: "AfrobeatsFan"
  },
]

export const LEADERBOARD = [
  { rank: 1, name: "OlaTrader", avatar: "OT", profit: 2450000, trades: 342, winRate: 78, volume: "₦12.5M" },
  { rank: 2, name: "AbujaWhale", avatar: "AW", profit: 1820000, trades: 215, winRate: 72, volume: "₦9.1M" },
  { rank: 3, name: "LagosGains", avatar: "LG", profit: 1350000, trades: 189, winRate: 69, volume: "₦7.8M" },
  { rank: 4, name: "NairaHunter", avatar: "NH", profit: 980000, trades: 156, winRate: 65, volume: "₦5.2M" },
  { rank: 5, name: "CryptoNaija", avatar: "CN", profit: 870000, trades: 298, winRate: 61, volume: "₦4.9M" },
  { rank: 6, name: "PredictKing", avatar: "PK", profit: 750000, trades: 132, winRate: 74, volume: "₦4.1M" },
  { rank: 7, name: "IbadanEdge", avatar: "IE", profit: 620000, trades: 98, winRate: 67, volume: "₦3.5M" },
  { rank: 8, name: "PHCtrader", avatar: "PH", profit: 510000, trades: 85, winRate: 63, volume: "₦2.8M" },
  { rank: 9, name: "KanoQuant", avatar: "KQ", profit: 430000, trades: 76, winRate: 60, volume: "₦2.2M" },
  { rank: 10, name: "EkoAlpha", avatar: "EA", profit: 380000, trades: 64, winRate: 58, volume: "₦1.9M" },
]

export const ACTIVITIES = [
  { id: 1, user: "OlaTrader", action: "Bought Yes", market: "Will the CBN raise the interest rate...?", amount: "₦50,000", time: "2 min ago", type: "buy" },
  { id: 2, user: "AbujaWhale", action: "Sold No", market: "Will Nigeria qualify for the 2026 FIFA World Cup?", amount: "₦120,000", time: "5 min ago", type: "sell" },
  { id: 3, user: "LagosGains", action: "Bought Kashim Shettima", market: "Who will be the APC presidential flag bearer?", amount: "₦80,000", time: "8 min ago", type: "buy" },
  { id: 4, user: "NairaHunter", action: "Sold Yes", market: "Will the Naira trade below ₦1,200/$...?", amount: "₦35,000", time: "12 min ago", type: "sell" },
  { id: 5, user: "CryptoNaija", action: "Bought No", market: "Will Ethereum flip Bitcoin...?", amount: "₦200,000", time: "15 min ago", type: "buy" },
  { id: 6, user: "PredictKing", action: "Bought Victor Osimhen", market: "Who will be the AFCON top scorer?", amount: "₦65,000", time: "18 min ago", type: "buy" },
  { id: 7, user: "IbadanEdge", action: "Sold No", market: "Will Wizkid drop a new album...?", amount: "₦18,000", time: "22 min ago", type: "sell" },
  { id: 8, user: "PHCtrader", action: "Bought Moniepoint", market: "Which Nigerian startup will be the next unicorn?", amount: "₦45,000", time: "30 min ago", type: "buy" },
]
