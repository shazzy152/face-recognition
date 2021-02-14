import React from 'react'; 

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPass : ''
        }
    }
    
    onEmailchange = (event) => {
        this.setState({signInEmail : event.target.value});
    }

    onPasschange = (event) => {
        this.setState({signInPass : event.target.value});
    }

    onSubmitsignin = () =>{
        fetch('http://localhost:3000/signin', {
            method : 'post',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email : this.state.signInEmail,
                password : this.state.signInPass
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user.email){
                this.props.loadUser(user);
                this.props.onRoutechange('home');
            } else if(!user.id) {
                alert("Please fill form");
            }
        }) 
    }
    
   
    render(){
        const { onRoutechange } = this.props;
        return (
            <article className="br3 ba b--black-10 w-100 w-50-m w-25-l mw7 center shadow-5">
                <main className="pa3 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0 pb0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt1">
                            
                            <input className=" input-reset ba bg-transparent hover-bg-black hover-white w-100 h3 f3" type="email" name="email-address"  id="email-address" onChange={this.onEmailchange}/>
                            <label className="db fw6 lh-copy f4 mt3" htmlFor="email-address">Email</label>
                        </div>
                        <div className="mv1">
                            
                            <input className="b input-reset ba bg-transparent hover-bg-black hover-white w-100 h3 f3" type="password" name="password"  id="password" onChange={this.onPasschange}/>
                            <label className="db fw6 lh-copy f4 pt3" htmlFor="password">Password</label>
                        </div>
                        </fieldset>
                        <div className="center pt5 pb3">
                        <input 

                        onClick={this.onSubmitsignin}
                        className="b ph3 pv2 mt1 input-reset ba--black--20 bg-transparent grow pointer f4 dib" 
                        type="submit" 
                        value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRoutechange('register')} href="#0" className="f5 link dim black db pb0 pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )  
    }
}

export default Signin
