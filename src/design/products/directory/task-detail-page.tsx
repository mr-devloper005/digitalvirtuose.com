import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { DirectoryPhotoGallery } from '@/components/tasks/directory-photo-gallery'
import { DirectoryHeaderActions } from '@/components/tasks/directory-header-actions'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const hideWebsiteOption = task === 'profile' || task === 'pdf' || task === 'listing'
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const tagList = Array.isArray(post.tags) ? post.tags.filter((item): item is string => typeof item === 'string') : []
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const hoursRaw = (content as Record<string, unknown>).hours
  const openHoursRaw = (content as Record<string, unknown>).openHours
  const workingHoursRaw = (content as Record<string, unknown>).workingHours
  const officeHoursRaw = (content as Record<string, unknown>).officeHours
  const rawHoursSource = hoursRaw ?? openHoursRaw ?? workingHoursRaw ?? officeHoursRaw
  const hourRows =
    typeof rawHoursSource === 'string'
      ? rawHoursSource
          .split(/\r?\n|,\s*/)
          .map((row) => row.trim())
          .filter(Boolean)
      : Array.isArray(rawHoursSource)
        ? rawHoursSource.filter((row): row is string => typeof row === 'string' && row.trim().length > 0)
        : []
  const displayHours = hourRows.length
    ? hourRows
    : ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed']
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ? Back to {taskLabel}
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:px-7 sm:py-6">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                <ContentImage src={images[0]} alt={`${post.title} logo`} fill className="object-cover" />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-900">{post.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  {phone ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                      <Phone className="h-3 w-3" /> {phone}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                    <Tag className="h-3 w-3" /> {category || taskLabel}
                  </span>
                  {location ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                      <MapPin className="h-3 w-3" /> {location}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <DirectoryHeaderActions task={task} postId={post.id} shareUrl={`${taskRoute}/${post.slug}`} />
              <a
                href={!hideWebsiteOption && website ? website : taskRoute}
                target={!hideWebsiteOption && website ? '_blank' : undefined}
                rel={!hideWebsiteOption && website ? 'noreferrer' : undefined}
                className="inline-flex items-center rounded-md bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-orange-600"
              >
                Visit
              </a>
            </div>
          </div>
        </section>

        <section className="mt-7 grid gap-8 lg:grid-cols-[1.24fr_0.76fr] lg:items-start">
          <div>
            <DirectoryPhotoGallery images={images} title={post.title} />

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold text-slate-900">Description</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Business overview</h2>
              <RichContent html={descriptionHtml} className="mt-4 text-sm leading-8 text-slate-600" />
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category || taskLabel}</p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight">{post.title}</h1>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><MapPin className="h-4 w-4" /> {location}</div> : null}
                {phone ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Phone className="h-4 w-4" /> {phone}</div> : null}
                {email ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Mail className="h-4 w-4" /> {email}</div> : null}
                {!hideWebsiteOption && website ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Globe className="h-4 w-4" /> {website}</div> : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {!hideWebsiteOption && website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-sm font-semibold text-slate-900">Location map</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-semibold text-slate-900">Open Hours</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {displayHours.map((row) => (
                  <li key={row} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-semibold text-slate-900">Categories</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {(tagList.length ? tagList.slice(0, 8) : [category || taskLabel]).map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
