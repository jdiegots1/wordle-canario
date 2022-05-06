import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AnterioresModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal
      title="CANARISMOS ANTERIORES"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-500 dark:text-gray-300">
       Mira el listado de canarismos que aparecieron en días anteriores 
        {' '}
        <a
          href="89N3PDyZzakoH7W6n8ZrjGDDktjh8iWFG6eKRvi3kvpQ"
          className="underline font-bold"> aquí. </a>{' '}
      </p>
    </BaseModal>
  )
}
