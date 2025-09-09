/**
 * Simplified Blog Service for Metro Mellow
 * Focus: Authentic content, customer problems, clear conversion paths
 * Strategy: Quality over quantity, real expertise over keyword stuffing
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;

  // Author (real team member or customer story)
  author: {
    name: string;
    avatar: string;
    role: string; // "Cleaning Specialist" | "Customer" | "Metro Mellow Team"
    bio: string;
  };

  // Simple categorization
  category: BlogCategory;
  tags: string[];

  // Publishing info
  publishedAt: string;
  updatedAt: string;
  readTime: number;

  // Essential SEO (simplified)
  metaDescription: string;
  featured: boolean;

  // Customer journey focus
  customerStage: "Awareness" | "Consideration" | "Decision" | "Retention";
  callToAction: {
    type: "Book Service" | "Get Quote" | "Contact Us" | "Learn More";
    text: string;
    link: string;
  };

  // Real social proof
  customerStory?: {
    name: string;
    location: string;
    result: string;
    beforeAfter?: {
      before: string;
      after: string;
    };
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  postCount: number;
  serviceConnection: string; // Which Metro Mellow service this relates to
}

// Authentic, customer-focused blog posts
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "sarah-apartment-transformation-deep-clean",
    title: "How We Transformed Sarah's Dusty Lagos Apartment in 4 Hours",
    excerpt:
      "See how our deep cleaning service helped Sarah, a busy lawyer in Victoria Island, reclaim her weekends and maintain a spotless home.",
    content: `
When Sarah contacted us, her 2-bedroom apartment in Victoria Island hadn't had a proper deep clean in months. As a corporate lawyer working 12-hour days, cleaning was the last thing on her mind.

## The Challenge
- Dust accumulation from Lagos traffic
- Bathroom grime from humidity
- Kitchen grease buildup
- Limited time for maintenance

## Our Approach
Our team arrived with eco-friendly products and a systematic plan:

**Hour 1: Assessment & Preparation**
- Moved furniture safely
- Identified problem areas
- Prepared cleaning solutions

**Hour 2-3: Deep Cleaning**
- Bathroom: Removed soap scum and mold
- Kitchen: Degreased surfaces and appliances  
- Living areas: Dusted and sanitized all surfaces
- Floors: Mopped with antimicrobial solution

**Hour 4: Final Touches**
- Reorganized spaces
- Applied protective treatments
- Quality check with Sarah

## The Results
Sarah's apartment was transformed. The air felt fresher, surfaces sparkled, and she could finally invite friends over without embarrassment.

*"I got my weekends back. Instead of spending Saturday cleaning, I'm exploring Lagos or relaxing. Metro Mellow is worth every naira." - Sarah K.*

## Why This Works for Busy Professionals
1. **Time Freedom**: 4 hours of your weekend back
2. **Professional Standards**: We clean like you live here
3. **Health Benefits**: Reduced allergens and bacteria
4. **Peace of Mind**: Consistent, reliable service

Ready to reclaim your weekends like Sarah?
    `,
    featuredImage: "/images/blog/blog-1.jpg",
    author: {
      name: "Kemi Adebayo",
      avatar: "/images/team/kemi-adebayo.jpg",
      role: "Lead Cleaning Specialist",
      bio: "5+ years experience in residential cleaning. Specialized in Lagos apartment maintenance.",
    },
    category: {
      id: "cleaning",
      name: "Cleaning Stories",
      slug: "cleaning",
      description: "Real customer transformations and cleaning insights",
      color: "#10B981",
      icon: "✨",
      postCount: 8,
      serviceConnection: "Deep Cleaning Service",
    },
    tags: [
      "customer story",
      "deep cleaning",
      "apartment",
      "Victoria Island",
      "time saving",
    ],
    publishedAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-03-15T09:00:00Z",
    readTime: 4,
    metaDescription:
      "See how Metro Mellow's deep cleaning service transformed Sarah's dusty Lagos apartment in just 4 hours, giving her weekends back.",
    featured: true,
    customerStage: "Consideration",
    callToAction: {
      type: "Book Service",
      text: "Get Your Apartment Transformation",
      link: "/book-cleaning",
    },
    customerStory: {
      name: "Sarah K.",
      location: "Victoria Island, Lagos",
      result: "4-hour apartment transformation, weekends reclaimed",
    },
  },

  {
    id: "2",
    slug: "lagos-humidity-laundry-care-guide",
    title: "Why Your Clothes Smell Musty (And How to Fix It)",
    excerpt:
      "Lagos humidity is ruining your laundry. Here's what we learned from 500+ laundry pickups and how to keep clothes fresh.",
    content: `
If your clothes smell musty within hours of washing, you're not alone. After handling 500+ laundry pickups across Lagos, we've identified the real culprit: humidity management, not just washing technique.

## The Lagos Laundry Challenge

**The Problem**: 80%+ humidity means clothes never fully dry
**The Result**: Mildew growth, musty smell, fabric damage
**The Cost**: Rewashing, replacing clothes, embarrassment

## What We've Learned (From Real Experience)

**Mistake #1: Indoor Drying**
Most Lagos apartments lack proper ventilation. Hanging clothes indoors traps moisture.

*Our solution*: We use industrial dehumidifiers and strategic airflow.

**Mistake #2: Overloading Machines**  
Packed washing machines don't rinse properly in humid conditions.

*Our solution*: Smaller loads, extra rinse cycles, faster turnaround.

**Mistake #3: Wrong Detergent**
Many detergents aren't formulated for tropical humidity.

*Our solution*: Anti-fungal additives and proper concentration ratios.

## The Metro Mellow Method

1. **Pre-treatment**: Check for humidity damage
2. **Controlled washing**: Optimal load sizes, extra rinses  
3. **Fast drying**: Climate-controlled facility
4. **Quality check**: Every item inspected before return

## Quick Fixes for Home Laundry

- **Use a fan**: Point directly at drying clothes
- **Vinegar rinse**: Add 1/2 cup white vinegar to final rinse
- **Dry immediately**: Don't let wet clothes sit
- **Iron while damp**: Heat kills remaining moisture and bacteria

## When to Call Professionals

If you're rewashing clothes or they smell within 24 hours, home methods aren't enough. Our climate-controlled process ensures fresh clothes every time.

*"I used to rewash everything twice. Now my clothes come back actually fresh and stay that way." - Michael O., Lekki*
    `,
    featuredImage: "/images/blog/blog-2.jpg",
    author: {
      name: "Metro Mellow Team",
      avatar: "/images/brand/brand-logo/solid-bg/green-bg.png",
      role: "Laundry Specialists",
      bio: "Collective insights from our laundry team based on real Lagos customer experiences.",
    },
    category: {
      id: "laundry",
      name: "Laundry Solutions",
      slug: "laundry",
      description: "Real solutions for Lagos laundry challenges",
      color: "#3B82F6",
      icon: "👕",
      postCount: 6,
      serviceConnection: "Laundry & Dry Cleaning",
    },
    tags: [
      "humidity",
      "musty clothes",
      "laundry tips",
      "Lagos weather",
      "fabric care",
    ],
    publishedAt: "2024-03-12T10:30:00Z",
    updatedAt: "2024-03-12T10:30:00Z",
    readTime: 3,
    metaDescription:
      "Stop rewashing musty clothes. Learn why Lagos humidity affects laundry and proven solutions from 500+ Metro Mellow pickups.",
    featured: true,
    customerStage: "Awareness",
    callToAction: {
      type: "Get Quote",
      text: "End Musty Clothes Forever",
      link: "/quote-laundry",
    },
    customerStory: {
      name: "Michael O.",
      location: "Lekki, Lagos",
      result: "No more rewashing, consistently fresh clothes",
    },
  },

  {
    id: "3",
    slug: "meal-prep-busy-lagos-family",
    title: "How the Johnsons Feed Their Family Without Cooking Daily",
    excerpt:
      "Meet the Johnson family: 2 working parents, 3 kids, zero time for daily cooking. Here's their Metro Mellow meal prep solution.",
    content: `
The Johnson family was drowning in dinner decisions. Two working parents, three school-age children, and the daily question: "What's for dinner?"

Sound familiar?

## The Pre-Metro Mellow Reality

**Sunday-Thursday**: Takeout rotation (expensive, unhealthy)
**Friday**: Grocery shopping chaos  
**Saturday**: Cooking marathon (exhausting)
**Result**: Stressed parents, inconsistent meals, budget strain

## The Custom Solution We Created

After understanding their preferences and dietary needs, we designed a family meal prep system:

**Weekly Planning Session**: 
- Family favorites: Jollof rice, grilled chicken, vegetable stew
- Kid-friendly options: Pasta, rice dishes, finger foods
- Health requirements: Mrs. Johnson's diabetes-friendly meals

**Prep Strategy**:
- 3 family dinners per week (Sunday prep)
- 2 quick-assembly meals (Wednesday prep) 
- Healthy snacks and school lunch components
- Weekend special meal (family choice)

**Storage System**:
- Labeled containers for each day
- Portion-controlled kids' meals
- Reheating instructions included

## Real Results After 3 Months

**Time Saved**: 8+ hours weekly
**Money Saved**: 40% reduction in food costs
**Health Improved**: Consistent home-cooked meals
**Stress Reduced**: No more "what's for dinner" panic

*"My kids actually ask for seconds now. We eat together as a family instead of grabbing whatever's quick. It's been life-changing." - Mrs. Johnson*

## Is Family Meal Prep Right for You?

**Perfect if you:**
- Have 2+ working parents
- Want healthier family meals
- Spend 30+ minutes daily on meal decisions
- Order takeout more than twice weekly

**Not ideal if:**
- You enjoy daily cooking
- Family has drastically different tastes
- You prefer very fresh (same-day) meals

## Getting Started

We offer a consultation to understand your family's:
- Dietary preferences and restrictions
- Schedule constraints  
- Budget parameters
- Storage capacity

Then create a custom meal prep plan that actually works for your life.

Ready to end dinner stress like the Johnsons?
    `,
    featuredImage: "/images/blog/blog-3.jpg",
    author: {
      name: "Chef Funmi",
      avatar: "/images/team/chef-funmi.jpg",
      role: "Family Meal Specialist",
      bio: "Specialized in Nigerian family meal planning and nutrition. Mother of 2.",
    },
    category: {
      id: "cooking",
      name: "Meal Solutions",
      slug: "cooking",
      description: "Real meal prep solutions for Lagos families",
      color: "#F59E0B",
      icon: "🍽️",
      postCount: 4,
      serviceConnection: "Meal Prep & Cooking",
    },
    tags: [
      "family meals",
      "meal prep",
      "working parents",
      "time saving",
      "healthy eating",
    ],
    publishedAt: "2024-03-08T14:15:00Z",
    updatedAt: "2024-03-08T14:15:00Z",
    readTime: 5,
    metaDescription:
      "See how the Johnson family solved dinner stress with Metro Mellow's custom meal prep service. 8+ hours saved weekly, healthier meals, happier family.",
    featured: false,
    customerStage: "Decision",
    callToAction: {
      type: "Contact Us",
      text: "Plan Your Family's Meals",
      link: "/contact-meal-prep",
    },
    customerStory: {
      name: "The Johnson Family",
      location: "Gbagada, Lagos",
      result:
        "8+ hours saved weekly, 40% food cost reduction, family dinners restored",
    },
  },

  {
    id: "4",
    slug: "ants-rainy-season-natural-solutions",
    title: "Tiny Ants Taking Over? Here's What Actually Works",
    excerpt:
      "Tried everything but ants keep coming back? Our pest team shares the 3-step method that stops ant invasions permanently (no harsh chemicals).",
    content: `
Last week, Mrs. Adebola called us in tears. Ants had taken over her kitchen, and nothing she tried was working.

Sound familiar? You're not alone.

## Why Nothing You've Tried Works

**Chalk lines**: Temporary deterrent at best
**Sprays**: Kill visible ants but miss the colony  
**Home remedies**: Inconsistent results
**The real problem**: You're treating symptoms, not the source

## Our 3-Step Permanent Solution

After 200+ successful ant treatments, here's what actually works:

### Step 1: Find the Source (Most People Skip This)
- Follow ant trails to entry points
- Identify what's attracting them (usually moisture + food)
- Locate outdoor colonies near your building

### Step 2: Eliminate Attractions 
- Fix water leaks (ants need moisture)
- Store food in sealed containers
- Clean up crumbs and spills immediately
- Address humidity issues

### Step 3: Safe Colony Treatment
We use natural, family-safe methods:
- Food-grade diatomaceous earth at entry points
- Borax bait stations (safe when placed correctly)
- Cinnamon and peppermint oil barriers
- Seal cracks with natural caulk

## The Lagos-Specific Challenge

Rainy season brings unique problems:
- Higher humidity attracts ants indoors
- More outdoor colonies seeking shelter
- Traditional poisons wash away quickly

Our treatments account for Lagos weather patterns.

## What to Expect

**Week 1**: Reduced ant activity (they're taking bait back to colony)
**Week 2**: Significant decrease
**Week 3**: Problem solved (follow-up treatment if needed)

## Prevention That Actually Works

1. **Monthly moisture check**: Look for leaks, standing water
2. **Food storage audit**: Everything in sealed containers
3. **Seasonal treatments**: Before rainy season starts
4. **Entry point maintenance**: Seal new cracks immediately

*"I haven't seen a single ant in 3 months. Finally, a solution that lasts." - Mrs. Adebola*

## When to Call Professionals

**DIY is fine for**: Small trails, recent problems, single room issues
**Call us for**: Multiple rooms affected, recurring problems, large colonies, family safety concerns

We guarantee our ant solutions for 90 days. If they come back, we return for free.

Don't let ants rule your kitchen.
    `,
    featuredImage: "/images/blog/blog-4.jpg",
    author: {
      name: "Tunde Okafor",
      avatar: "/images/team/tunde-okafor.jpg",
      role: "Eco-Pest Specialist",
      bio: "8 years experience in natural pest control. Father of 3, advocates for family-safe solutions.",
    },
    category: {
      id: "pest-control",
      name: "Pest Solutions",
      slug: "pest-control",
      description: "Real pest problems, proven natural solutions",
      color: "#EF4444",
      icon: "🐜",
      postCount: 3,
      serviceConnection: "Eco-Pest Control",
    },
    tags: [
      "ants",
      "natural pest control",
      "rainy season",
      "kitchen pests",
      "family safe",
    ],
    publishedAt: "2024-03-05T11:20:00Z",
    updatedAt: "2024-03-05T11:20:00Z",
    readTime: 4,
    metaDescription:
      "Stop ant invasions permanently with our proven 3-step natural method. 90-day guarantee, family-safe, effective in Lagos weather.",
    featured: false,
    customerStage: "Consideration",
    callToAction: {
      type: "Book Service",
      text: "End Your Ant Problem",
      link: "/book-pest-control",
    },
    customerStory: {
      name: "Mrs. Adebola",
      location: "Surulere, Lagos",
      result: "3 months ant-free after failed DIY attempts",
    },
  },

  {
    id: "5",
    slug: "metro-mellow-story-why-we-started",
    title: "Why We Started Metro Mellow (It's Personal)",
    excerpt:
      "The real story behind Metro Mellow: two working parents who couldn't find reliable help, and the solution we built for families like ours.",
    content: `
This isn't a typical "about us" story. It's personal.

## The Breaking Point

Two years ago, my wife and I were both working 60-hour weeks. Our home was falling apart. Laundry piled up, takeout boxes cluttered the kitchen, and we spent weekends doing chores instead of enjoying our family.

We tried hiring help. Here's what happened:

**Cleaner #1**: Didn't show up (twice)
**Cleaner #2**: Used our expensive products, broke a vase, no accountability  
**Laundry service**: Lost our favorite clothes
**Meal delivery**: Expensive, bland, not Nigerian food

## The Realization

Lagos has amazing service providers, but no reliable way to find and manage them. We needed:
- **Vetted professionals** we could trust in our home
- **Consistent quality** and accountability
- **Fair pricing** without hidden fees
- **Technology** to make booking and communication easy

Since we couldn't find it, we decided to build it.

## Building the Solution

We started by interviewing 100+ Lagos families about their home service struggles:

**Top Complaints**:
1. Unreliable providers (no-shows, poor communication)
2. Inconsistent quality (different person every time)
3. Pricing confusion (surprise charges)
4. No accountability (problems with no recourse)

**What People Actually Wanted**:
- Same trusted team consistently
- Clear, upfront pricing
- Easy rebooking and communication
- Professional standards with accountability

## Our Standards (Learned the Hard Way)

**Every team member**:
- Background checked and verified
- Trained in our quality standards  
- Insured and bonded
- Rated by real customers

**Every service**:
- Clear scope and pricing upfront
- Quality guarantee with accountability
- Easy scheduling and rescheduling
- Professional tools and supplies included

## The Results (So Far)

**18 months later**:
- 500+ satisfied families across Lagos
- 95% customer retention rate
- Same trusted teams building relationships
- Zero security incidents

## What's Next

We're expanding to more Lagos neighborhoods and adding services our customers request. But our mission stays the same: giving Lagos families their time back with reliable, professional home services.

*"Metro Mellow gave us our weekends back. We trust them completely with our home and our schedule." - The Adkins Family*

## Why This Matters to You

If you're tired of unreliable service providers, surprise charges, and giving up your weekends to chores, we built Metro Mellow for you.

We know how valuable your time is because we've been there.

Ready to get your time back?
    `,
    featuredImage: "/images/blog/blog-5.jpg",
    author: {
      name: "Metro Mellow Founders",
      avatar: "/images/brand/brand-logo/solid-bg/green-bg.png",
      role: "Founders",
      bio: "Working parents who built the home service solution they wished existed in Lagos.",
    },
    category: {
      id: "company",
      name: "Our Story",
      slug: "company",
      description: "Behind the scenes at Metro Mellow",
      color: "#8B5CF6",
      icon: "❤️",
      postCount: 2,
      serviceConnection: "All Services",
    },
    tags: [
      "founding story",
      "mission",
      "Lagos families",
      "working parents",
      "reliability",
    ],
    publishedAt: "2024-03-01T16:45:00Z",
    updatedAt: "2024-03-01T16:45:00Z",
    readTime: 6,
    metaDescription:
      "The personal story behind Metro Mellow: why we built Lagos' most reliable home service platform and our mission to give families their time back.",
    featured: true,
    customerStage: "Awareness",
    callToAction: {
      type: "Learn More",
      text: "See All Our Services",
      link: "/services",
    },
  },
];

export const categories: BlogCategory[] = [
  {
    id: "cleaning",
    name: "Cleaning Stories",
    slug: "cleaning",
    description: "Real customer transformations and cleaning insights",
    color: "#10B981",
    icon: "✨",
    postCount: 8,
    serviceConnection: "Deep Cleaning Service",
  },
  {
    id: "laundry",
    name: "Laundry Solutions",
    slug: "laundry",
    description: "Real solutions for Lagos laundry challenges",
    color: "#3B82F6",
    icon: "👕",
    postCount: 6,
    serviceConnection: "Laundry & Dry Cleaning",
  },
  {
    id: "cooking",
    name: "Meal Solutions",
    slug: "cooking",
    description: "Real meal prep solutions for Lagos families",
    color: "#F59E0B",
    icon: "🍽️",
    postCount: 4,
    serviceConnection: "Meal Prep & Cooking",
  },
  {
    id: "pest-control",
    name: "Pest Solutions",
    slug: "pest-control",
    description: "Real pest problems, proven natural solutions",
    color: "#EF4444",
    icon: "🐜",
    postCount: 3,
    serviceConnection: "Eco-Pest Control",
  },
  {
    id: "company",
    name: "Our Story",
    slug: "company",
    description: "Behind the scenes at Metro Mellow",
    color: "#8B5CF6",
    icon: "❤️",
    postCount: 2,
    serviceConnection: "All Services",
  },
];

// Simplified service functions
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const posts = blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return limit ? posts.slice(0, limit) : posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return blogPosts.find((post) => post.slug === slug) || null;
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return blogPosts.filter((post) => post.featured);
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<BlogPost[]> {
  return blogPosts.filter((post) => post.category.slug === categorySlug);
}

export async function getRelatedPosts(
  currentSlug: string,
  limit: number = 2
): Promise<BlogPost[]> {
  const currentPost = await getBlogPost(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter(
      (post) =>
        post.slug !== currentSlug &&
        (post.category.id === currentPost.category.id ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return categories;
}

// Content strategy helpers
export interface ContentPlan {
  month: string;
  focus: string;
  posts: {
    title: string;
    type: "customer_story" | "tips" | "behind_scenes";
    service: string;
    priority: "high" | "medium";
  }[];
}

export function generateContentPlan(months: number = 3): ContentPlan[] {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = new Date().getMonth();

  return Array.from({ length: months }, (_, i) => {
    const monthIndex = (currentMonth + i) % 12;
    const month = monthNames[monthIndex];
    const isRainySeason = monthIndex >= 3 && monthIndex <= 9;

    return {
      month,
      focus: isRainySeason
        ? "Rainy season challenges"
        : "Dry season optimization",
      posts: [
        {
          title: `${month} Customer Transformation Story`,
          type: "customer_story" as const,
          service: "cleaning",
          priority: "high" as const,
        },
        {
          title: isRainySeason
            ? `Dealing with ${month} Humidity: Practical Tips`
            : `${month} Deep Clean Checklist`,
          type: "tips" as const,
          service: isRainySeason ? "laundry" : "cleaning",
          priority: "medium" as const,
        },
      ],
    };
  });
}

// Analytics and insights
export interface BlogAnalytics {
  topPerforming: BlogPost[];
  conversionFocus: BlogPost[];
  customerJourneyGaps: string[];
}

export function getBlogAnalytics(): BlogAnalytics {
  const topPerforming = blogPosts
    .filter((post) => post.featured)
    .sort((a, b) => a.readTime - b.readTime); // Shorter = more likely to be read

  const conversionFocus = blogPosts.filter(
    (post) =>
      post.callToAction.type === "Book Service" ||
      post.callToAction.type === "Get Quote"
  );

  return {
    topPerforming,
    conversionFocus,
    customerJourneyGaps: [
      "Need more 'Decision' stage content",
      "Missing service comparison guides",
      "Could use more customer testimonials",
    ],
  };
}
