import React from 'react';

function Rent() {
    return (
        <div>
            <form action="">
                <div>
                    <p>Login</p>
                    <label htmlFor="text">Nombre</label>
                    <input type="text" id="nombre" />
                </div>
                <div>
                    <label htmlFor="text">apellido</label>
                    <input type="text" id="apellido" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Rent;
