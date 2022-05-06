import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const ParticipaModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Participa" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Si quieres publicar en FarmaWordle o tienes alguna sugerencia, rellena este formulario o envíanos un correo a feedback@farmawordle.app  con tus sugerencias.
Pendiente formulario y configuración correo.
      </p>
    </BaseModal>
  )
}
