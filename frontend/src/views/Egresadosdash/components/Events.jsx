const Events = () => {
    const availableEvents = [
        { id: 1, name: "Reunión de Egresados", date: "2024-10-28" },
        { id: 2, name: "Taller de Networking", date: "2024-11-05" },
        { id: 3, name: "Conferencia de Oportunidades", date: "2024-11-12" },
    ];

    return (
        <div>
            <h2>Eventos Disponibles</h2>
            <ul>
                {availableEvents.map(event => (
                    <li key={event.id}>{event.name} - {event.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
