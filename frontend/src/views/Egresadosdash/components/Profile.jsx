
const Profile = () => {
    const handleUpdate = () => {
        // Lógica para actualizar el perfil
        alert("Perfil actualizado!");
    };

    return (
        <div>
            <h2>Perfil del Egresado</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required />
                </div>
                <button type="submit">Actualizar Perfil</button>
            </form>
        </div>
    );
};

export default Profile;
