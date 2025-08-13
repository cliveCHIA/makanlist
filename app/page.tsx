'use client'
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, ExternalLink, Filter } from "lucide-react";

/**
 * Singapore F&B Listicle Site – Starter
 * -------------------------------------
 * • One-file React app you can paste into a Next.js/CRA project or deploy on Vercel/Netlify.
 * • Tailwind-ready UI with search, filters, listicle cards, and monetization hooks.
 * • Swap SAMPLE_DATA with your venues/posts. Add affiliate links (Klook/Chope/KKday/etc.).
 * • SEO: lightweight JSON-LD schema and meta placeholders.
 *
 * How to use quickly (Next.js App Router):
 * 1) Create app/page.tsx and paste this file's default export.
 * 2) Ensure Tailwind is configured; deploy to Vercel.
 * 3) Replace SAMPLE_DATA with your curated venues and listicles. Done.
 */

// ---------- SAMPLE CONTENT (Edit me) ----------
const SAMPLE_DATA = {
  brand: {
    name: "MakanList",
    tagline: "Find great eats across Singapore, fast.",
    primaryColor: "#0ea5e9", // tailwind sky-500
  },
  affiliates: {
    // Put your affiliate params here
    klook: {
      base: "https://www.klook.com/en-SG/",
      utm: "?aid=YOUR_AFFILIATE_ID&aff_adid=LISTICLE2025",
    },
    chope: {
      base: "https://www.chope.co/singapore-restaurants/",
      utm: "?utm_source=your-site&utm_medium=affiliate",
    },
  },
  areas: ["Orchard", "Bugis", "Tiong Bahru", "Katong", "CBD", "Novena"],
  cuisines: [
    "Japanese",
    "Korean",
    "Chinese",
    "Malay",
    "Indian",
    "Western",
    "Vegan",
    "Seafood",
    "Desserts",
  ],
  venues: [
    {
      id: "ramen-orchard-01",
      name: "Ramen Gokoro",
      area: "Orchard",
      cuisine: "Japanese",
      price: 2, // 1=$, 2=$$, 3=$$$
      rating: 4.5,
      blurb: "Rich tonkotsu, springy noodles, under $15 lunch sets.",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
      affiliate: {
        label: "Book on Klook",
        url: "https://www.klook.com/en-SG/city/14-singapore/" /* + params later */,
        type: "klook",
      },
      tags: ["ramen", "noodles", "lunch deals"],
    },
    {
      id: "bbq-tanjong-02",
      name: "Seoul Charcoal BBQ",
      area: "CBD",
      cuisine: "Korean",
      price: 3,
      rating: 4.3,
      blurb: "Premium cuts, smokeless grills, great for groups.",
      image:
        "https://images.unsplash.com/photo-1536007164800-b7f11331f35e?q=80&w=1600&auto=format&fit=crop",
      affiliate: {
        label: "Reserve on Chope",
        url: "https://www.chope.co/singapore-restaurants/",
        type: "chope",
      },
      tags: ["bbq", "date night", "group"],
    },
    {
      id: "dessert-bugis-03",
      name: "Snow & Sago",
      area: "Bugis",
      cuisine: "Desserts",
      price: 1,
      rating: 4.2,
      blurb: "Shaved ice towers, mango sago, wallet-friendly.",
      image:
        "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=1600&auto=format&fit=crop",
      affiliate: {
        label: "Deals on Klook",
        url: "https://www.klook.com/en-SG/city/14-singapore/",
        type: "klook",
      },
      tags: ["dessert", "late night", "sweet"],
    },
  ],
  posts: [
    {
      slug: "best-ramen-orchard",
      title: "7 Best Ramen Places in Orchard (2025)",
      summary:
        "From budget bowls to premium tonkotsu – slurp through Orchard without breaking the bank.",
      hero:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
      picks: ["Ramen Gokoro", "Umai Ramen Lab", "Tonkotsu Street"],
    },
    {
      slug: "affordable-buffets-under-40",
      title: "10 Affordable Buffets in SG Under $40",
      summary: "All-you-can-eat without the tax shock.",
      hero:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1600&auto=format&fit=crop",
      picks: ["Seoul Charcoal BBQ", "Haru Hotpot", "Eat-All-Day Noodle Bar"],
    },
  ],
};

// ---------- HELPERS ----------
// ---------- HELPERS ----------
function classNames(
  ...arr: Array<string | false | null | undefined>
) {
  return arr.filter(Boolean).join(" ");
}

function priceToDollarSigns(n: number): string {
  return "$".repeat(n);
}

function withAffiliate(
  baseUrl: string,
  type: string,
  affiliates: any
): string {
  if (type === "klook") return baseUrl + affiliates.klook.utm;
  if (type === "chope") return baseUrl + affiliates.chope.utm;
  return baseUrl;
}

// ---------- MAIN APP ----------
export default function Page() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxPrice, setMaxPrice] = useState(3);
  const brand = SAMPLE_DATA.brand;

  const filtered = useMemo(() => {
    return SAMPLE_DATA.venues.filter((v) => {
      const matchesQuery =
        !query ||
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.tags.join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesArea = !area || v.area === area;
      const matchesCuisine = !cuisine || v.cuisine === cuisine;
      const matchesPrice = v.price <= maxPrice;
      return matchesQuery && matchesArea && matchesCuisine && matchesPrice;
    });
  }, [query, area, cuisine, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <div className="h-9 w-9 rounded-xl" style={{ background: brand.primaryColor }} />
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight">{brand.name}</h1>
            <p className="text-xs text-gray-500 -mt-1">{brand.tagline}</p>
          </div>
          <a
            href="#sponsor"
            className="hidden sm:inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
          >
            Sponsor a post
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Eat smarter in Singapore</h2>
            <p className="mt-2 text-gray-600">Search by area, cuisine, budget, or browse our latest listicles below.</p>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border bg-white p-3">
              <Search className="shrink-0" />
              <input
                aria-label="Search venues"
                placeholder="Try 'ramen orchard' or 'buffet under $40'"
                className="w-full outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                className="rounded-xl border p-2"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">All areas</option>
                {SAMPLE_DATA.areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              <select
                className="rounded-xl border p-2"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              >
                <option value="">All cuisines</option>
                {SAMPLE_DATA.cuisines.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="rounded-xl border p-2 flex items-center gap-2">
                <Filter />
                <label className="text-sm text-gray-600">Max budget:</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-medium tabular-nums">{priceToDollarSigns(maxPrice)}</span>
              </div>
            </div>
          </div>

          {/* Ad / Monetization Card */}
          <aside className="md:col-span-1">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-xs uppercase text-gray-500">Sponsored</p>
              <h3 className="mt-1 font-semibold">Feature your restaurant</h3>
              <p className="mt-1 text-sm text-gray-600">Reach hungry readers actively searching where to eat.</p>
              <a
                href="#sponsor"
                className="mt-3 inline-flex items-center justify-center rounded-xl bg-black px-3 py-2 text-white text-sm hover:opacity-90"
              >
                Get listed
              </a>
              <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-500">
                <p>Ad slot (300×250). Connect Google AdSense/Ezoic here.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Venues */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="flex items-end justify-between">
          <h3 className="text-xl font-bold">Curated picks</h3>
          <p className="text-sm text-gray-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <motion.article
              key={v.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold leading-tight">{v.name}</h4>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} />
                    <span className="text-sm font-medium">{v.rating}</span>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{v.area}</span>
                  <span>·</span>
                  <span>{v.cuisine}</span>
                  <span>·</span>
                  <span>{priceToDollarSigns(v.price)}</span>
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">{v.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.tags.map((t) => (
                    <span key={t} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">#{t}</span>
                  ))}
                </div>
                {v.affiliate?.url && (
                  <a
                    href={withAffiliate(v.affiliate.url, v.affiliate.type, SAMPLE_DATA.affiliates)}
                    target="_blank"
                    rel="nofollow noopener"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {v.affiliate.label}
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Latest Listicles */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h3 className="text-xl font-bold">Latest listicles</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {SAMPLE_DATA.posts.map((p) => (
              <article key={p.slug} className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={p.hero} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold leading-tight">{p.title}</h4>
                  <p className="mt-1 text-sm text-gray-700 line-clamp-2">{p.summary}</p>
                  <a href={`/${p.slug}`} className="mt-3 inline-flex text-sm text-sky-600 hover:underline">
                    Read the picks →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="font-semibold">Monetization</h4>
            <ul className="mt-2 text-sm text-gray-600 list-disc ml-5 space-y-1">
              <li>Connect Google AdSense/Ezoic in the Sponsored card slot.</li>
              <li>Replace affiliate URLs with your Klook/Chope/KKday links.</li>
              <li>Add <code>rel=&quot;nofollow sponsored&quot;</code> on sponsored links/pages.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Roadmap</h4>
            <ul className="mt-2 text-sm text-gray-600 list-disc ml-5 space-y-1">
              <li>Add dynamic routing for /[slug] listicle pages.</li>
              <li>Plug a CMS (Notion/Google Sheets) for content updates.</li>
              <li>Add sitemap.xml, robots.txt, and OpenGraph/Twitter meta.</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-gray-500">
          © {new Date().getFullYear()} {SAMPLE_DATA.brand.name}. Made with ♥ in Singapore.
        </div>
      </footer>
    </div>
  );
}
