'use client'
import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
let socket: Socket;

const Home = () => {
    const [input, setInput] = useState('')

    useEffect(() => { socketInitializer() }, [])

    const socketInitializer = async () => {
        // await fetch('/api/socket');
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('update-input', msg => {
            setInput(msg)
            console.log("🚀 ~ socketInitializer ~ msg:", msg)
        })
    }

    const onChangeHandler = (e) => {
        console.log("🚀 ~ onChangeHandler ~ e:", e)
        setInput(e.target.value)

        socket.emit('input-change', e.target.value)
    }

    return (
        <input
            placeholder="Type something"
            value={input}
            onChange={onChangeHandler}
        />
    )
}

export default Home;