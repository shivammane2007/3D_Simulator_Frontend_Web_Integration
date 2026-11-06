import manifestJson from '@/public/images/simulator-output/manifest.json'

export interface OutputSetting {
  label: string
  value: string
}

export type OutputView = 'front' | 'side'

export interface OutputPair {
  slug: string
  view: OutputView
  face: string
  width: number
  height: number
  beforeSrc: string
  afterSrc: string
  settings: OutputSetting[]
}

/** One nose type (or other presenting concern) shown on a different face. */
export interface SimulatorCase extends OutputPair {
  type: string
}

export interface SimulatorUiShot {
  src: string
  width: number
  height: number
}

export interface SimulatorOverlay extends SimulatorUiShot {
  /** The values the simulator printed on the overlay, verbatim. */
  printed: string[]
}

type Point = [number, number]

/** An AI-generated cast portrait; anchors are fractions of its width and height. */
export interface CastFace {
  id: string
  src: string
  size: number
  anchors: {
    midDorsum: Point
    noseTip: Point
    upperLip: Point
    lips: Point
    upperLidImageLeft: Point
    eyeImageLeft: Point
    eyeImageRight: Point
  }
}

interface ManifestControl {
  label: string
  before: string
  after: string
}

interface ManifestPair {
  procedure: string
  view: OutputView
  face: string
  files: { before: string; after: string }
  size: { width: number; height: number }
  controls: ManifestControl[]
  kept: boolean
}

interface ManifestOverlay {
  procedure: string
  view: string
  file: string
  size: { width: number; height: number }
  printed?: string[]
  kept: boolean
}

interface ManifestCastEntry {
  heroFile: string | null
  heroSize?: number
  anchors?: CastFace['anchors']
}

interface SimulatorManifest {
  cast: Record<string, ManifestCastEntry>
  pairs: ManifestPair[]
  cases?: (ManifestPair & { type: string })[]
  overlays?: ManifestOverlay[]
}

const manifest = manifestJson as unknown as SimulatorManifest

function srcFor(file: string): string {
  return `/images/simulator-output/${file}`
}

function toOutputPair(pair: ManifestPair): OutputPair {
  return {
    slug: pair.procedure,
    view: pair.view,
    face: pair.face,
    width: pair.size.width,
    height: pair.size.height,
    beforeSrc: srcFor(pair.files.before),
    afterSrc: srcFor(pair.files.after),
    settings: pair.controls.map((control) => ({ label: control.label, value: control.after })),
  }
}

/** One entry per kept pair of a view. A procedure the manifest omits shows no tab. */
export function getSimulatorOutput(view: OutputView = 'front'): OutputPair[] {
  return manifest.pairs.filter((pair) => pair.kept && pair.view === view).map(toOutputPair)
}

/** The kept pair for a procedure and view, or null. */
export function getSimulatorPair(slug: string, view: OutputView): OutputPair | null {
  const pair = manifest.pairs.find((entry) => entry.kept && entry.procedure === slug && entry.view === view)
  return pair ? toOutputPair(pair) : null
}

/** The kept cases of a procedure, in manifest order. */
export function getSimulatorCases(slug: string): SimulatorCase[] {
  return (manifest.cases ?? [])
    .filter((entry) => entry.kept && entry.procedure === slug)
    .map((entry) => ({ ...toOutputPair(entry), type: entry.type }))
}

/** Every cast portrait with a hero file and measured anchors, in manifest order. */
export function getHeroCast(): CastFace[] {
  return Object.entries(manifest.cast).flatMap(([id, entry]) =>
    entry.heroFile && entry.heroSize && entry.anchors
      ? [{ id, src: entry.heroFile, size: entry.heroSize, anchors: entry.anchors }]
      : [],
  )
}

/** The kept measurement overlay for a procedure and view, or null. */
export function getSimulatorOverlay(slug: string, view: string): SimulatorOverlay | null {
  const overlay = manifest.overlays?.find((entry) => entry.kept && entry.procedure === slug && entry.view === view)
  return overlay
    ? { src: srcFor(overlay.file), width: overlay.size.width, height: overlay.size.height, printed: overlay.printed ?? [] }
    : null
}
