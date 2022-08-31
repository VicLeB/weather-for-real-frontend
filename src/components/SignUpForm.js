import React, {useState} from 'react'

function SignUpForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [homeLocationCode, setHomeLocationCode] = useState("")
    const [errors, setErrors] = useState([])

    function handleCreateUser(e){
        e.preventDefault();
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
            Confirm password
            <input type="password" value={passwordConfirmation} onChange={(e)=> setPasswordConfirmation(e.target.value)}/>
        </label>
        <label>
            Set default location with Zip/postal code:
            <input type="text" value={homeLocationCode} onChange={(e) => setHomeLocationCode(e.target.value)}/>
            <p>enter a 5 digit zipcode, or 6 character postal code (example: zip: 91111 or postal:L6H7M1)</p>
        </label>
        <input type='submit' value="Create account"/>
    </form>
    {errors? <div>{errors.map((error)=> `${error}, ` )}</div>:null}
    </>
  )
}

export default SignUpForm