import React from "react";
import './SignIn.css'
import land from './robobrain.svg';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            email: '',
            password: '',
        }
    }

    onNameEnter = event => this.setState({name: event.target.value});
    onEmailEnter = event => this.setState({email: event.target.value});
    onPasswordEnter = event => this.setState({password: event.target.value});

    validateEmail = e => {
        const emailRegex = /.+@.+\..+/;
        let validityMessage = "";
        if (!emailRegex.test(e.target.value)) {
            validityMessage = "Invalid email address";
        }
        document.getElementById("emailHelp").textContent = validityMessage;
    }


    onSubmitRegister = () => {
        fetch('https://boiling-lake-36219.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('signin')
            } else if (user == 'unable to register') {
                let validityMessage = "";
                validityMessage = "Email address already exists.";
                document.getElementById("emailHelp").textContent = validityMessage;
            } else if (user == 'incorrect form submission') {
                const output = document.getElementById("passwordHelp");
                output.textContent = `You cannot leave any field empty.`
                output.style.color = "red";
            }
        })

    }

    checkPasswordLength = (event) => {
        const output = document.getElementById("passwordHelp");
        const password1 = event.target.value;
        if (password1.length < 6) {
            output.textContent = "Your password must be at least 6 characters long.";
            output.style.color = "red";
        } else if (password1.length >= 6) {
            const passwordRegex = /\d/; 
            if (!passwordRegex.test(event.target.value)) {
                output.textContent = `This is not a valid password. Your must must include at least 1 digit.`
                output.style.color = "red";
            } else if (passwordRegex.test(event.target.value)) {
                output.textContent = `This is a valid password.`
                output.style.color = "green";
            }
        }
    }

    matchPassword =() => {
        const firstPassword = document.getElementById("password1");
        const secondPassword = document.getElementById("password2");
        const output = document.getElementById("passwordHelp");
    
        if (firstPassword.value === secondPassword.value) {
            output.textContent = `Both passwords match, we are good to go.`
            output.style.color = "green";
        } else {
            output.textContent = `Make sure both passwords match.`
            output.style.color = "red";
        }

    }

    matchPasswordAndSetPassword = (event) => {
        this.matchPassword();
        this.onPasswordEnter(event);
    }


    render () {
        return(
            <div className="jumbotron">
                <div className="logoWrap"><img src={land} alt=''/> </div>
                <div className="rightSide">
                    <div className="landTexts">
                        <h1>Welcome to Big Brain!</h1>
                        <h4>Sign up to use our service.</h4>
    
    
                        <div>
    
                            <div className="wrapperrhs">
                                <div className="txtbox"><input onBlur={this.validateEmail} onChange={this.onEmailEnter} type="email" id="email-address" placeholder="Email Address" required/></div>
                                <span style={{color:"red"}} id="emailHelp"></span>
                                <div className="txtbox"><input onChange={this.onNameEnter} type="text" name="name" id="name" placeholder="Username" required/></div>
                                <div className="txtbox"><input onInput={this.checkPasswordLength} type="password" name="password" id="password1" placeholder="Password" required/> </div>
                                <div className="txtbox"><input onChange={this.matchPasswordAndSetPassword} type="password" id="password2" name="password" placeholder="Confirm Password" required/></div>
                                <p id="passwordHelp"></p>
                            </div>
    
    
                        </div>
    
    
    
                    </div>
                    <div className="buttonsszz">
                    <button onClick={this.onSubmitRegister} className="butter">Sign Up</button>
                    <p>Already have an account? <span onClick={() => this.props.onRouteChange('signin')} className="signline">Sign In</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
