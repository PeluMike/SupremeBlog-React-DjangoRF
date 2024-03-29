import React, {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator';


import '../stylings/register.css'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Logospiner from '../components/Logospiner'
import {
    isEmpty, isSame, getLength, fecthUsers, usernameExist, emailExist,
    isContainUppercase, isContainLowercase, isContainNumbers, isContainRegExp
} from '../utils/myValidator'


import { register } from '../actions/userAction'


function Register() {
    // setting states 
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const dispatch = useDispatch()
    // const location = useLocation()
   

    // navigaion 
    const navigate = useNavigate()


    // the login redux 
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo} = userLogin


    // checking if user is loged in and redirecting 
    useEffect(() =>{
        if (userInfo){
            return navigate('/')
        }
        fecthUsers(setAllUsers)
    }, [navigate, userInfo])
   
    
    // password case checking 
    let passedCaseValidator  = false
    if ( isContainLowercase(password) && isContainNumbers(password) && isContainRegExp(password) && isContainUppercase(password)){
        passedCaseValidator = true
    }
   
    
    // checking for existing email and username
    const checkUsername = usernameExist(allUsers, username)
    const checkEmail = emailExist(allUsers, email)
    // validations and registering
    const registerHandler =  (e) =>{
        e.preventDefault()
        if (isEmpty(username) || isEmpty(password) || isEmpty(email)){
            setMessage('Please fill the required forms')
        }else if(!validator.isStrongPassword(password) || validator.isNumeric(username) || !isSame(password, password2) || !passedCaseValidator){
            setMessage('')
            console.log('error at password')
        }else if(getLength(username, 6) || checkUsername){
            setMessage('')
            console.log('erorr at username')
        }else if(checkEmail || !validator.isEmail(email)){
            setMessage('')
            console.log('error at email')
        }
        else{
            e.preventDefault()
            const usernameLower = username.toLowerCase()
            const  emailLower = email.toLowerCase()
            dispatch(register(usernameLower,emailLower, password)).then(()=>{
                navigate('/')
            })
        }
    }
    
  return (
    <div className='Camp'>
        <div className='Form'>
            
        </div>
        <Logospiner/>

        {loading && <Loader />}
        {error && <Message variant='error'>{error}</Message>}
        <div className='Form-container'>
            <p className='red'>{message}</p>
            <form onSubmit={registerHandler}>
                <div id='all'>
                    <div>
                        <h1>Sign Up</h1>
                       
                    </div>
                    <div className='fistName'>
                        <label htmlFor="FirstName">First Name (optional)</label>
                        <br />
                        <input type="text" placeholder='Your first name...' name='first_name'/>
                    </div>
                    <br />
                
                    <div className='lastName'>
                        <label htmlFor="LastName">Last Name (optional)</label>
                        <br />
                        <input type="text" placeholder='Your Last name...' name='last_name'/>
                    </div>
                    <br />
                
                    <div className='username'>
                        <label htmlFor="Username">Username*</label>
                        <br />
                        <input type="text" placeholder='Your username...' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        {username?<li className={getLength(username, 6)?'red validError':validator.isNumeric(username)?'hidden':'green validError'}>Username must be 6 character</li>: ''}
                        {validator.isNumeric(username)?<li className='red'>Username cannot be numeric</li>: ''}
                        {<li className={checkUsername?'red validError':'hidden'}>Username has been chosen</li>}
                        {/* {getLength(username, 6)?<li className={checkUsername === undefined?'green validError':'hidden'}>Username is available</li>: ''} */}
                    </div>
                    <br />
            
                    <div className='email'>
                        <label htmlFor="Email">Email Adress*</label>
                        <br />
                        <input type="text" placeholder='Enter your email adress...' name='email' value={email} onChange ={(e) => setEmail(e.target.value)}/>
                        {email? <li className={validator.isEmail(email)?'green validError':'red validError'}>Enter a Valid email</li>: ''}
                        {<li className={checkEmail?'red validError':'hidden'}>Email is already attatched to a user</li>}
                    </div>
                    <br />
                    
                    <div className='password'>
                        <label htmlFor="Password">Password*</label>
                        <br />
                        <input type="password" placeholder='Enter your password...' name='password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete=''/>
                        {/* {password? <li className={validator.isStrongPassword(password)?'green validError':'red validError'}>Password must contain Uppercase, lowercase and a special character</li>: ''} */}
                       
                        {password?
                            <div>
                                <li className={isContainUppercase(password)?'green validError':'red validError'}>Must contain uppercase</li>
                                <li className={isContainLowercase(password)?'green validError':'red validError'}>Must contain lowercase</li>
                                <li className={isContainNumbers(password)?'green validError':'red validError'}>Must contain numbers</li>
                                <li className={isContainRegExp(password)?'green validError':'red validError'}>Must contain a special caracter</li>
                            </div>
                        : ""}
                        
                    </div>
                    <br />
                    
                    <div className='comfirmPassword'>
                        <label htmlFor="Password">Comfirm Password*</label>
                        <br />
                        <input type="password" placeholder='Confrim your password...' name='password' value={password2} onChange={(e) => setPassword2(e.target.value)} autoComplete=''/>
                        {password2? <li className={isSame(password, password2)?'green validError':'red validError'}>Must be the same with password</li>: ''}
                    </div>
                    <br />
                    <button type='submit'>Sign Up</button>
                    <p className='_d_'>Already have an account? <Link to={'/login/'} className='sign_link'>sign in</Link></p>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default Register