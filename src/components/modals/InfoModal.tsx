import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="CÓMO JUGAR" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Tienes seis intentos para adivinar el canarismo del día. Después de cada
        intento, el color de las teclas se modificará para mostrarte qué tan
        cerca estás de acertar.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="E" status="correct" />
        <Cell value="N" />
        <Cell value="R" />
        <Cell value="A" />
        <Cell value="L" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La palabra contiene la letra E y está en el lugar correcto.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="F" />
        <Cell value="I" />
        <Cell value="N" />
        <Cell value="O" status="present" />
        <Cell value="D" />
        <Cell value="A" status="present" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La palabra contiene las letras O y A pero están en el lugar incorrecto.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="G" />
        <Cell value="A" />
        <Cell value="N" />
        <Cell value="D" />
        <Cell value="U" />
        <Cell value="T" status="absent" />     
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La palabra no contiene la letra T.
      </p>

      <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
        En el Wordle Canario, la palabra del día es un canarismo
        incluído en la Academia Canaria de la Lengua.
      </p>
    </BaseModal>
  )
}
