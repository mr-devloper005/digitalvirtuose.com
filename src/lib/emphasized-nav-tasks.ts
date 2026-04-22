import type { SiteFactoryRecipe } from '@/design/factory/types'
import { SITE_CONFIG, type TaskConfig } from '@/lib/site-config'

/** Primary + optional secondary tasks for homepage and main nav emphasis. */
export function getEmphasizedTaskKeys(recipe: Pick<SiteFactoryRecipe, 'primaryTask' | 'secondaryTask'>): string[] {
  const raw = [recipe.primaryTask, recipe.secondaryTask].filter(Boolean) as string[]
  return [...new Set(raw)]
}

export function getEmphasizedEnabledTasks(recipe: Pick<SiteFactoryRecipe, 'primaryTask' | 'secondaryTask'>): TaskConfig[] {
  const keys = new Set(getEmphasizedTaskKeys(recipe))
  return SITE_CONFIG.tasks.filter((t) => t.enabled && keys.has(t.key))
}

/** Enabled tasks not in the primary/secondary emphasis set (footer, mobile “more”, etc.). */
export function getSupplementalEnabledTasks(recipe: Pick<SiteFactoryRecipe, 'primaryTask' | 'secondaryTask'>): TaskConfig[] {
  const keys = new Set(getEmphasizedTaskKeys(recipe))
  return SITE_CONFIG.tasks.filter((t) => t.enabled && !keys.has(t.key))
}
