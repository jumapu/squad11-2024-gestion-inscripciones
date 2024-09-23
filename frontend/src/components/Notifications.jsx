import PropTypes from 'prop-types'; 
import { Text } from "@radix-ui/themes";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Notifications = ({ notifications, onClose }) => {
  // Notificaciones de muestra
  const defaultNotifications = notifications.length === 0 ? [
    { message: 'Notificación 1: Tienes un nuevo mensaje.' },
    { message: 'Notificación 2: Tu perfil ha sido actualizado.' },
    { message: 'Notificación 3: Un nuevo comentario en tu publicación.' },
  ] : notifications;

  return (
    <div>
      <div>
        <Text as="h4">Notificaciones</Text>
        <button onClick={onClose}><IoIosCloseCircleOutline /></button>
      </div>
      {defaultNotifications.length === 0 ? (
        <Text as="p">No hay nuevas notificaciones.</Text>
      ) : (
        defaultNotifications.map((notification, index) => (
          <div key={index}>
            <Text>{notification.message}</Text>
          </div>
        ))
      )}
    </div>
  );
};

// validación de las Props
Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notifications;
