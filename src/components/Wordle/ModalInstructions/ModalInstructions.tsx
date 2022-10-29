import { ModalsContext } from "@/context";
import { useCallback, useContext } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";
import InstructionsExample from "./InstructionsExample";
import { examples } from "./ModalInstructions.helpers";

const ModalInstructionts = () => {
  const { modals, closeModalByKey } = useContext(ModalsContext);

  const handleCloseModal = useCallback(() => {
    closeModalByKey("showHowToPlay");
  }, [closeModalByKey]);

  useModal(modals.showHowToPlay, handleCloseModal);

  return (
    <Modal isOpen={modals.showHowToPlay} onClose={handleCloseModal}>
      <h1 className="text-4xl font-extrabold text-center mb-8">Cómo jugar</h1>
      <div className="flex flex-col gap-y-4 mb-4">
        <p>Adivina la palabra oculta en cinco intentos.</p>
        <p>Cada intento debe ser una palabra válida de 5 letras.</p>
        <p>
          Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.
        </p>
      </div>
      <p className="font-bold mb-6">Ejemplos</p>
      <div className="flex flex-col gap-y-6">
        {examples.map((example, idx) => (
          <InstructionsExample key={`modal-inst-example-${idx}`} {...example} />
        ))}
      </div>
      <p className="my-9">
        Puede haber letras repetidas. Las pistas son <br /> independientes para cada letra.
      </p>
      <p className="mb-9 mx-auto">¡Una palabra nueva cada 5 minutos!</p>
      <Button className="uppercase" onClick={handleCloseModal}>
        ¡jugar!
      </Button>
    </Modal>
  );
};

export default ModalInstructionts;
