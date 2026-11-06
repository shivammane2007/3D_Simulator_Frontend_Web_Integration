import type { OutputSetting } from '@/lib/homepage/simulator-output'

const VALUE_PATTERN = /^(.*?)\s*([+-]?\d+(?:\.\d+)?)\s*(mm|%|°)?$/

/** Each simulator setting once, as the simulator prints it, with the number in Instrument Serif. */
export default function SimulatorSettings({ settings }: { settings: OutputSetting[] }) {
    return (
        <>
            {settings.map((setting, index) => {
                const match = VALUE_PATTERN.exec(setting.value)
                const joiner = index === 0 ? '' : index === settings.length - 1 ? ' and ' : ', '
                const name = index === 0 ? setting.label.charAt(0) + setting.label.slice(1).toLowerCase() : setting.label.toLowerCase()
                if (!match) return <span key={setting.label}>{joiner}{name} {setting.value}</span>
                const [, word, number, unit = ''] = match
                return (
                    <span key={setting.label}>
                        {joiner}{name} {word ? `${word.toLowerCase()} by ` : ''}
                        <span className="editorial-stats text-base text-ink">{number}{unit === 'mm' ? '\u00a0mm' : unit}</span>
                    </span>
                )
            })}
        </>
    )
}
