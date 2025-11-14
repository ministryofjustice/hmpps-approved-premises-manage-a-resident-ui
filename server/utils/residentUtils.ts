import { BadgeColour } from '../@types/placementTypes'
import { NavigationEntry } from '../@types/nunjucks'
import paths from '../paths'

function getBadge(text: string, colour: BadgeColour) {
  return `<span class="moj-badge moj-badge--${colour}">${text}</span>`
}

function subNavArray(residentId: string, activeTab: string): Array<NavigationEntry> {
  return [
    navEntry('Personal', '#', activeTab),
    navEntry('Health', '#', activeTab),
    navEntry('Placement', paths.placements.index({ residentId }), activeTab),
    navEntry('Offence and sentence', '#', activeTab),
    navEntry('Enforcement', '#', activeTab),
  ]
}

function placementSideNavArray(residentId: string, activeTab: string): Array<NavigationEntry> {
  return [
    navEntry('Placement information', paths.placements.index({ residentId }), activeTab),
    navEntry('Previous AP stays', '#', activeTab),
  ]
}

function navEntry(text: string, href: string, activeTab: string): NavigationEntry {
  return { text, href, active: activeTab === text }
}

export { getBadge, subNavArray, placementSideNavArray }
