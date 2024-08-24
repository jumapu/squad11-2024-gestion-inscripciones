import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

const ModalCrear = () => (

    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="btn1 Button violet">Crear Evento</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Nuevo Evento</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Crea tu evento.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="eventname">
              Nombre del Evento
            </label>
            <input className="Input" id="eventname" defaultValue="Por ejemplo: Simulacion" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="Fecha de Inicio">
              Username
            </label>
            <input className="Input" id="datestart" defaultValue="2024-09-05" />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className="Button green">Guardar Evento</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
);


export default ModalCrear;