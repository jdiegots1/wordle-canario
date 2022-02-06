import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Adivina la palabra en seis intentos. Después de cada intento, el color de las letras se cambia para mostrar qué tan cerca estás de la palabra.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="F" status="correct" />
        <Cell value="I" />
        <Cell value="S" />
        <Cell value="C" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La letra F está en la palabra y en el lugar correcto.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="F" />
        <Cell value="L" />
        <Cell value="E" status="present" />
        <Cell value="J" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La letra E está en la palabra pero en el lugar equivocado.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="B" />
        <Cell value="R" />
        <Cell value="E" />
        <Cell value="G" status="absent" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La letra G no está en la palabra en ningún lugar.
      </p>
    </BaseModal>
  )
}
