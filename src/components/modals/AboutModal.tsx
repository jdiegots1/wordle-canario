import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal
      title="SOBRE ESTE JUEGO"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Por {' '}
        <a
          href="https://twitter.com/JDiegoTejeraS"
          className="underline font-bold"
        >
          @JDiegoTejeraS
        </a>{' '}
        {' '} - A partir del código abierto y los canarismos incluídos en el 
        Diccionario Básico de Canarismos (Fuente: Academia Canaria de la Lengua) 
        - Encuentra el código {' '} <a href="https://github.com/cwackerfuss/react-wordle" className="underline font-bold">
        aquí </a>{' '}y los canarismos 
        {' '}
        <a
          href="https://www.academiacanarialengua.org/diccionario/" className="underline font-bold">
          aquí</a>{' '}.
      </p>
    </BaseModal>
  )
}
