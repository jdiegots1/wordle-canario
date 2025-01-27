import React, { useState } from 'react'
import { BaseModal } from './BaseModal' // Asegúrate de importar el BaseModal

type QuestionModalProps = {
  isOpen: boolean
  handleClose: () => void
}

export const QuestionModal = ({ isOpen, handleClose }: QuestionModalProps) => {
  const [answer, setAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleSubmit = () => {
    if (answer.toLowerCase() === 'desparrama la vista') {
      setIsCorrect(true)
      setTimeout(() => handleClose(), 1500) // Cierra el modal después de un segundo si la respuesta es correcta
    } else {
      setIsCorrect(false)
    }
  }

  return (
    <BaseModal title="Oye... Tengo una pregunta" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm sm:text-md font-medium mb-4">
        ¿Sabrías decirme como sigue la frase? <strong>"Abre los ojos y..."</strong>
      </p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 mb-4 w-full"
        placeholder="Escribe tu respuesta..."
      />
      <button
        onClick={handleSubmit}
        className="mx-auto px-4 py-2 text-white bg-blue-500 rounded mt-4"
      >
        Responder
      </button>
      {isCorrect === false && (
        <p className="text-red-500 mt-2">¡Ups! Esa no es la respuesta correcta.</p>
      )}
      {isCorrect === true && (
        <p className="text-green-500 mt-2">¡Correcto! ¡Bien hecho!</p>
      )}
    </BaseModal>
  )
}
