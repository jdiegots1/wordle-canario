import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const ClueModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal
      title="Pista"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500 dark:text-gray-300">
       Aquí encontrarás la pista para esta partida.
      </p>
    </BaseModal>
  )
}
