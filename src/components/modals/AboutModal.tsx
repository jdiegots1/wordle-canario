import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Sobre este juego" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Por @JDiegoTejeraS - A partir del código abierto -{' '}
        <a
          href="https://github.com/hannahcode/GAME"
          className="underline font-bold"
        >
          encuentra el código aquí
        </a>{' '}
      </p>
    </BaseModal>
  )
}
