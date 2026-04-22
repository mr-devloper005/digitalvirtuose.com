import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "Aurum Legal Advisory",
    "Meridian Dental Studio",
    "Northbridge Logistics",
    "Cedarview Architects",
    "Verde Wellness Clinic",
    "Blue Orbit Digital",
    "Crimson Auto Works",
    "Elevate Tax Consultants",
  ],
  classified: [
    "Retail Unit Available Near Metro",
    "Senior Accountant Hiring",
    "Pre-Owned Toyota Innova",
    "Event Photography Package Offer",
    "Warehouse Space for Lease",
    "Bulk Office Furniture Clearance",
    "Digital Marketing Contract Role",
    "CCTV Installation Service Deal",
  ],
  article: [
    "How Local Businesses Win Trust Online",
    "7 Listing Signals That Increase Enquiries",
    "Building High-Intent Directory Landing Pages",
    "What Buyers Compare Before Contacting You",
    "Why Verified Profiles Convert Better",
    "Operational Playbook for Multi-Branch Listings",
    "Service Pricing Pages That Actually Convert",
    "Fixing Low-Quality Leads from Search Traffic",
  ],
  image: [
    "Corporate Lobby Showcase",
    "Restaurant Interior Walkthrough",
    "Clinic Reception Gallery",
    "Executive Team Portrait Set",
    "Manufacturing Floor Highlights",
    "Luxury Office Workspace Tour",
    "Retail Merchandising Visual Set",
    "Before and After Renovation Shots",
  ],
  profile: [
    "Riya Mehta",
    "Arjun Malhotra",
    "Nexus Build Partners",
    "Helios Consulting Team",
    "Kavya Singh",
    "Rahul Bansal",
    "Olive Street Collective",
    "Vertex Operations Group",
  ],
  social: [
    "Weekly Business Growth Roundup",
    "Partner Collaboration Announcement",
    "New Verified Profiles This Week",
    "Top Searched Categories Update",
    "Community Q&A Highlights",
    "Local Market Trend Snapshot",
    "Upcoming Webinar Invite",
    "Lead Generation Insights Thread",
  ],
  pdf: [
    "B2B Lead Qualification Template",
    "Business Profile Optimization Checklist",
    "Service Proposal Deck Sample",
    "Local SEO Audit Worksheet",
    "Sales Discovery Call Script",
    "Directory Listing Compliance Guide",
    "Customer Onboarding SOP",
    "Quarterly Marketing Planner",
  ],
  org: [
    "Nimbus Infra Solutions",
    "Harborline Advisory Group",
    "Pioneer Wellness Network",
    "Maplepoint Developers",
    "Sterling Commerce Alliance",
    "Vector Education Partners",
    "Axis Mobility Collective",
    "Summit Business Circle",
  ],
  sbm: [
    "Google Business Profile Playbook",
    "Local Backlink Strategy Vault",
    "Landing Page CRO Resources",
    "Business Storytelling Reference List",
    "SME Sales Funnel Benchmarks",
    "Conversion Copywriting Toolkit",
    "Business Directory Best Practices",
    "Reputation Management Resources",
  ],
  comment: [
    "Reply: Qualification Criteria",
    "Commentary: Listing Quality Standards",
    "Response: Lead Intent Tracking",
    "Thread: Industry-Specific Categories",
    "Opinion: Better Contact Flows",
    "Reply: Search Ranking Strategy",
    "Commentary: Trust Badge Usage",
    "Thread: Location Page Structure",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: ["Legal Services", "Healthcare", "Logistics", "Architecture", "Digital Agency"],
  classified: ["Commercial Space", "Hiring", "Vehicles", "Services", "Equipment"],
  article: ["Lead Generation", "SEO", "Operations", "Sales", "Brand Trust"],
  image: ["Office", "Hospitality", "Clinic", "Corporate", "Industrial"],
  profile: ["Founder", "Director", "Operations Lead", "Consultant", "Team"],
  social: ["Community", "Platform Updates", "Growth Insights", "Announcements", "Events"],
  pdf: ["Playbook", "Checklist", "Template", "SOP", "Guide"],
  org: ["Enterprise", "SME Group", "Consultancy", "Network", "Alliance"],
  sbm: ["Growth", "SEO", "Sales", "Branding", "Operations"],
  comment: ["Feedback", "Review", "Reply", "Discussion", "Opinion"],
};

const summaryByTask: Record<TaskKey, string> = {
  listing: "Premium business profile with category details, contact paths, and clear service context.",
  classified: "Recent community listing with urgency signals and direct response details.",
  article: "Long-form perspective post covering growth, operations, and execution playbooks.",
  image: "Visual gallery post with high-impact media and concise narrative context.",
  profile: "Public profile entry with identity, background, and trust-oriented metadata.",
  social: "Community update posted for quick signal sharing and interaction.",
  pdf: "Resource drop with summary, scope, and practical implementation notes.",
  org: "Organization profile page featuring capabilities, positioning, and focus areas.",
  sbm: "Curated bookmark entry saved with summary and category context.",
  comment: "Discussion response with short-form opinion and supporting context.",
};

const randomFrom = (items: string[], index: number) =>
  items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

const authorNames = [
  "Rohit Munjal",
  "Aarav Sharma",
  "Neha Kapoor",
  "Ishaan Verma",
  "Tanya Roy",
  "Vikram Desai",
  "Maya Gupta",
  "Kabir Arora",
  "Aditi Nair",
  "Samar Jain",
];

const cityNames = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Chandigarh",
  "Jaipur",
  "Ahmedabad",
  "Kolkata",
  "Goa",
];

const companyNames = [
  "Vertex Commerce",
  "Northline Studio",
  "PrimeNest Group",
  "BlueGrid Labs",
  "Oakridge Systems",
  "Skylane Works",
  "Crestpoint Media",
  "Atlas Venture",
  "Brightsmith Partners",
  "Linear District",
];

const buildPublishedDate = (index: number) =>
  new Date(Date.now() - index * 1000 * 60 * 60 * 6).toISOString();

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  return Array.from({ length: 18 }).map((_, index) => {
    const title = randomFrom(taskTitles[task], index);
    const category = randomFrom(taskCategories[task], index);
    const city = randomFrom(cityNames, index);
    const company = randomFrom(companyNames, index);
    const author = randomFrom(authorNames, index);
    const slug = `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: `${summaryByTask[task]} Posted from ${city}.`,
      content: {
        type: task,
        category,
        location: city,
        description: `${summaryByTask[task]} ${company} shared this update to help visitors discover and evaluate quickly.`,
        website: `https://www.${company.toLowerCase().replace(/[^a-z0-9]+/g, "")}.in`,
        phone: `+91-98${String(10000000 + index).slice(-8)}`,
        company,
        address: `${15 + index}, Business Park Road, ${city}`,
      },
      media: [{ url: buildImage(task, index), type: "IMAGE" }],
      tags: [task, category],
      authorName: author,
      publishedAt: buildPublishedDate(index),
      createdAt: buildPublishedDate(index + 1),
    };
  });
};
