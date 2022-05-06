import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const TransparenciaModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Transparencia" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Para poder mejorar y mantener el proyecto FarmaWordle y hacerlo sostenible a largo plazo,
        los autores declaran que algunos días el juego estará patrocinado por diferentes agentes
        interesados (se indicará en el propio juego cuando así lo sea. Si quieres patrocinar
        #FarmaWordle puedes ponerte en contacto con nosotros rellenando este formulario o escribiendo
        un correo electrónico a patrocinios@farmawordle.app.
      </p>
    </BaseModal>
  )
}
