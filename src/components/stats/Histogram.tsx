import { GameStats } from '../../lib/localStorage'
import { Progress } from './Progress'

type Props = {
  gameStats: GameStats
}

export const Histogram = ({ gameStats }: Props) => {
  const winDistribution = gameStats?.winDistribution ?? []
  const maxValue = winDistribution.length ? Math.max(...winDistribution) : 0

  return (
    <div className="flex flex-col m-2 text-sm dark:text-white" role="list" aria-label="Distribución de aciertos">
      {winDistribution.map((value, i) => (
        <Progress
          key={i}
          index={i}
          size={maxValue > 0 ? 90 * (value / maxValue) : 0}
          label={String(value)}
        />
      ))}
    </div>
  )
}
