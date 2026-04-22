import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory':
    'bg-[radial-gradient(ellipse_80%_50%_at_0%_-10%,rgba(176,228,204,0.45),transparent_55%),linear-gradient(180deg,#f4faf7_0%,#ffffff_55%)]',
  'listing-showcase':
    'bg-[linear-gradient(180deg,#ffffff_0%,#eef7f2_100%)]',
  'article-editorial':
    'bg-[radial-gradient(circle_at_top_left,rgba(40,90,72,0.06),transparent_22%),linear-gradient(180deg,#faf9f7_0%,#ffffff_100%)]',
  'article-journal':
    'bg-[linear-gradient(180deg,#fbfaf8_0%,#f4faf7_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#091413_0%,#0f1f1c_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(165deg,#091413_0%,#122922_55%,#0f1f1c_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#0c1816_0%,#122922_100%)] text-white',
  'profile-business':
    'bg-[radial-gradient(circle_at_100%_0%,rgba(176,228,204,0.35),transparent_40%),linear-gradient(180deg,#ffffff_0%,#f4faf7_100%)]',
  'classified-bulletin':
    'bg-[repeating-linear-gradient(-12deg,rgba(40,90,72,0.03)_0px,rgba(40,90,72,0.03)_8px,transparent_8px,transparent_16px),linear-gradient(180deg,#f8faf7_0%,#ffffff_100%)]',
  'classified-market':
    'bg-[linear-gradient(180deg,#f0f7f3_0%,#ffffff_100%)]',
  'sbm-curation':
    'bg-[linear-gradient(180deg,#f7f5f0_0%,#ffffff_100%)]',
  'sbm-library':
    'bg-[linear-gradient(180deg,#f4f6f4_0%,#fafcfa_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const ui = isDark
    ? {
        muted: 'text-[#b0e4cc]/80',
        panel: 'border border-white/12 bg-white/8',
        soft: 'border border-white/10 bg-white/6',
        input: 'border-white/12 bg-white/8 text-white placeholder:text-white/40',
        button: 'bg-[#408a71] text-[#f4faf7] hover:bg-[#285a48]',
      }
    : layoutKey.startsWith('article')
      ? {
          muted: 'text-muted-foreground',
          panel: 'border border-border bg-card shadow-[0_20px_50px_rgba(9,20,19,0.05)]',
          soft: 'border border-border bg-muted/50',
          input: 'border border-border bg-card text-foreground',
          button: 'bg-primary text-primary-foreground hover:bg-primary/90',
        }
      : layoutKey.startsWith('sbm')
        ? {
            muted: 'text-muted-foreground',
            panel: 'border border-dashed border-primary/25 bg-card',
            soft: 'border border-border bg-secondary/40',
            input: 'border border-border bg-background text-foreground',
            button: 'bg-foreground text-background hover:bg-foreground/90',
          }
        : layoutKey.startsWith('classified')
          ? {
              muted: 'text-muted-foreground',
              panel: 'border-2 border-primary/20 bg-card',
              soft: 'border border-border bg-secondary/30',
              input: 'border border-border bg-card text-foreground',
              button: 'bg-primary text-primary-foreground hover:bg-primary/90',
            }
          : {
              muted: 'text-muted-foreground',
              panel: 'border border-border bg-card shadow-[0_18px_48px_rgba(9,20,19,0.06)]',
              soft: 'border border-border bg-muted/40',
              input: 'border border-border bg-card text-foreground',
              button: 'bg-primary text-primary-foreground hover:bg-primary/90',
            }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-14 border-b border-border pb-12">
            <div className="grid gap-8 lg:grid-cols-1 lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{taskConfig?.label || task}</p>
                <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{taskConfig?.description || 'Latest posts'}</h1>
                <p className={`mt-5 max-w-2xl text-base leading-relaxed ${ui.muted}`}>
                  Directory-first layout: wide headings and tight metadata so visitors can scan like a serious marketplace.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-14 border-b border-border/80 pb-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
              <div className="max-w-3xl">
                <p className="font-display text-xs uppercase tracking-[0.35em] text-primary">{taskConfig?.label || task}</p>
                <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-[3.25rem]">{taskConfig?.description || 'Latest posts'}</h1>
                <p className={`mt-6 text-base leading-8 ${ui.muted}`}>
                  Editorial rhythm: serif-led headline, generous line length, and a slim sidebar for filters so reading stays the hero—distinct from the directory grid above the fold elsewhere.
                </p>
              </div>
              <div className={`rounded-2xl p-6 ${ui.panel}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.22em] text-primary`}>Issue filter</p>
                <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Narrow topics without borrowing listing-card density.</p>
                <form className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col" action={taskConfig?.route || '#'}>
                  <select name="category" defaultValue={normalizedCategory} className={`h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                  <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-semibold ${ui.button}`}>Apply</button>
                </form>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-14 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual studio
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                Dark emerald stage, mint highlights, and collage blocks—built so imagery feels immersive, not like a repurposed listing row.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className={`min-h-[200px] rounded-2xl sm:min-h-[220px] ${ui.panel}`} />
              <div className={`min-h-[200px] rounded-2xl sm:min-h-[220px] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[100px] rounded-2xl sm:min-h-[120px] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-14 overflow-hidden rounded-2xl ${layoutKey === 'profile-business' ? 'border border-border bg-card p-8 shadow-sm lg:p-10' : 'border border-white/10 bg-white/6 p-8 lg:p-10'}`}>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div className={`min-h-[220px] rounded-2xl lg:min-h-[260px] ${ui.soft}`} />
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${layoutKey === 'profile-business' ? 'text-primary' : 'text-[#b0e4cc]'}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Identity surfaces that anchor trust before the feed.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                  {layoutKey === 'profile-business'
                    ? 'Light split layout with mint wash—suited to firms and operators who need a credible portrait beside their listings.'
                    : 'Nocturnal variant with higher contrast for creators who want gallery adjacency without looking like a directory clone.'}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className={`rounded-2xl p-7 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] text-primary`}>{taskConfig?.label || task}</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Offers, roles, and alerts in a tighter board rhythm.</h1>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Stripe texture and bold panel borders separate classified energy from the calmer listing grid.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Fast scan', 'Price-forward', 'Urgency-friendly'].map((item) => (
                <div key={item} className={`rounded-xl p-4 ${ui.soft}`}>
                  <p className="text-sm font-semibold text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{taskConfig?.label || task}</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Collections, not cards—reference density with lighter chrome.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                Dashed panels and index-card neutrals keep bookmarks visually distinct from listings and articles on the same engine.
              </p>
            </div>
            <div className={`rounded-2xl p-6 ${ui.panel}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">Shelf filter</p>
              <form className="mt-5 flex flex-col gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl text-sm font-semibold ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-2xl border border-border/80 p-6 shadow-[0_14px_40px_rgba(9,20,19,0.05)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            {task !== 'listing' ? (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {intro.links.map((link) => (
                  <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
