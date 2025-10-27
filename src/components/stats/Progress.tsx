type Props = {
  index: number
  size: number
  label: string
}

export const Progress = ({ index, size, label }: Props) => {
  const width = Math.min(98, 8 + size)
  return (
    <div className="flex items-center justify-start m-1" role="listitem">
      <div className="w-6 pr-1 text-right">{index + 1}</div>
      <div className="w-full ml-2">
        <div
          style={{ width: `${width}%` }}
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 rounded"
          aria-label={`Intentos ${index + 1}: ${label}`}
        >
          {label}
        </div>
      </div>
    </div>
  )
}
