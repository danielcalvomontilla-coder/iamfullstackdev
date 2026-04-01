import { useState } from 'react';

function InputCreate({ setUpdate }) {
    const [title, setTitle] = useState('')
    const [res, setRes] = useState('Listo para enviar')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const urlApi = 'http://localhost:3005/create'
        const payload = { title }

        try {
            const response = await fetch(urlApi, {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json' // Indicamos que el contenido es JSON
                },
                body: JSON.stringify(payload) // Convertimos el payload de JS a JSON
            })

        if(response.ok) {
            const data = await response.json() // Convertimos la respuesta de JSON a JS            
            setRes(`Enviado: ${data.title}`) // Actualizamos el estado con la respuesta del servidor
            setTitle('') // Limpiamos el input después de enviar el formulario
            setUpdate(prev => !prev) // Actualizamos el estado de actualización para que se vuelva a renderizar el componente padre
        } else {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
        }        

        } catch (err) {
            console.log(err)

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type='submit'>Create</button>
            </form>
            {res}
        </>
    )

}

export default InputCreate;