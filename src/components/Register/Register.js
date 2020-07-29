import React from 'react';


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
                // this.props.onRouteChange('home')
            } else {
                alert('you might want to try that again')
            }
        })

    }

    render () {
        return (
            <div>
                <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6  center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameEnter} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailEnter} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordEnter} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="confpassword">Confirm Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="confpassword"  id="confpassword"/>
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                            </fieldset>
                            <div className="">
                            <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up"/>
                            </div>
                            <div className="lh-copy mt3">
                            <p onClick={() => this.props.onRouteChange('signin')} className="f6 link dim black pointer db">Already Have an account? Sign in</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default Register