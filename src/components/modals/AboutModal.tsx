import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Sobre el juego" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Por <a href="https://twitter.com/JDiegoTejeraS" className="underline font-bold">@JDiegoTejeraS</a> - A partir del código abierto y los canarismos de la Academia Canaria de la Lengua -{' '}
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
