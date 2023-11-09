import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Signin(props) {

    const [message, setMessage] = useState('')

    const navigator = useNavigate()

    const signInChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        const tempUser = { ...props.user };
        tempUser[name] = value;
        props.setUser(tempUser);


    }

    const signInSubmitHandler = () => {

        if (props.user.userName !== '' && props.user.email !== '' && props.user.password !== '') {
            axios.post('http://localhost:8080/signIn', props.user)
                .then((response) => {

                    console.log(response.data)
                    localStorage.setItem("userId", response.data.id)
                    props.setUser(response.data)
                    navigator('/')
                }).catch((e) => {
                    console.log(e)
                    // setMessage(e.response.data)
                })

        } else {
            setMessage("please provide accurate information")
        }

    }

    return (

        <div className = "fill flex-col">
            
            {message}

            <h1>SignIn</h1>          
                       

            <label>Email</label>
            <input name='email' type='text' value={props.user.email} onChange={signInChangeHandler} />

            <label>Password</label>
            <input name='password' type='password' value={props.user.password} onChange={signInChangeHandler} />
            <button onClick={signInSubmitHandler}>SUBMIT</button>

            <label>isAdmin</label>
            <input name='isAdmin' type='checkbox' value={props.user.isAdmin} onChange={signInChangeHandler} />

        </div>
    )
}

export default Signin;