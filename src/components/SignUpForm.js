import React, {useState} from 'react'
const ENDPOINT = 'http://localhost:3000'

function SignUpForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [homeLocationCode, setHomeLocationCode] = useState("")
    const [errors, setErrors] = useState([])

    function handleCreateUser(e){
        e.preventDefault();

        fetch(`${ENDPOINT}/users`,{
            method: 'POST',
            headers:{
                Accepts: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    user:{
                        username: username,
                        password: password,
                        home_location_code: homeLocationCode,
                    },
                }),
        }).then(res => res.json())
        .then(console.log)
    }

    return (
    <>
    <form onSubmit={handleCreateUser}>
        <label>
            Username
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </label>
        <label>
            Password
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </label>
        <label>
            Set default location with Zip/postal code:
            <input type="text" value={homeLocationCode} onChange={(e) => setHomeLocationCode(e.target.value)}/>
            <p>enter a 5 digit zip-code, or 6 character postal-code (example: zip: 91111 or postal:L6H7M1)</p>
        </label>
        <input type='submit' value="Create account"/>
    </form>
    {errors? <div>{errors.map((error)=> `${error}, ` )}</div>:null}
    </>
    )
}

export default SignUpForm