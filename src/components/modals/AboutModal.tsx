import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="SOBRE EL JUEGO" isOpen={isOpen} handleClose={handleClose}>
      <div className="text-sm text-gray-700 dark:text-gray-200 space-y-3">
        <p>
          Hecho por{' '}
          <a
            href="https://www.linkedin.com/in/juandiegotejerasosa/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            Diego Tejera
          </a>
          . Inspirado en Wordle y adaptado al habla canaria.
        </p>

        <p>
          Los canarismos proceden del{' '}
          <a
            href="https://www.academiacanarialengua.org/diccionario/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            Diccionario Básico de Canarismos (ACL)
          </a>
          .
        </p>

        <p>
          Código del proyecto:{' '}
          <a
            href="https://github.com/jdiegots1/wordle-canario"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            GitHub
          </a>
          .
        </p>

        <p>
          Si te gusta, puedes apoyar el desarrollo en{' '}
          <a
            href="https://www.paypal.me/wordlecanario"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            PayPal
          </a>
          .
        </p>
      </div>
    </BaseModal>
  )
}
