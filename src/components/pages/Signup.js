import { useState } from  "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'



function Signup(props) {

    const [message, setMessage] = useState('')

    const navigator = useNavigate()

    const signUpChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        const tempUser = { ...props.user };
        tempUser[name] = value;
        props.setUser(tempUser);

    }

    const signUpSubmitHandler = () => {

        if (props.user.userName !== '' && props.user.email !== '' && props.user.password !== '') {
            axios.post('http://localhost:8080/signup', props.user)
                .then((response) => {

                    console.log(response.data)
                    localStorage.setItem("email", response.data.email)
                    navigator('/signin')
                }).catch((e) => {
                    console.log(e)
                    setMessage(e)
                })

        } else {
            setMessage("please provide accurate information")
        }

    }

    return (

        <div className = "fill flex-col">
            
            {message}

            <h1>SignUp</h1>
            
            
            <label>First Name</label>
            <input name='firstName' type='text' value={props.user.firstName} onChange={signUpChangeHandler} />

            <label>Last Name</label>
            <input name='lastName' type='text' value={props.user.lastName} onChange={signUpChangeHandler} />

            <label>Email</label>
            <input name='email' type='text' value={props.user.email} onChange={signUpChangeHandler} />

            <label>Password</label>
            <input name='password' type='password' value={props.user.password} onChange={signUpChangeHandler} />
            <button onClick={signUpSubmitHandler}>SUBMIT</button>

            <label>isAdmin</label>
            <input name='isAdmin' type='checkbox' value={props.user.isAdmin} onChange={signUpChangeHandler} />

        </div>
    )

}

export default Signup;