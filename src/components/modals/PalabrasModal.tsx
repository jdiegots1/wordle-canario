import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const PalabrasModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Glosario" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Mira el listado de palabras que aparecieron en días anteriores -{' '}
        <a
          href="https://github.com/hannahcode/GAME"
          className="underline font-bold"
        >
          aquí
        </a>{' '}
      </p>
    </BaseModal>
  )
}
