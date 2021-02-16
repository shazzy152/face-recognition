import React from 'react'; 

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Email: '',
            Pass : '',
            Name: ''
        }
    }

    onNamechange = (event) => {
        this.setState({Name : event.target.value});
    }
    
    onEmailchange = (event) => {
        this.setState({Email : event.target.value});
    }

    onPasschange = (event) => {
        this.setState({Pass : event.target.value});
    }

    onSubmitsignin = () =>{
        fetch('https://young-mesa-75445.herokuapp.com/register', {
            method : 'post',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email : this.state.Email,
                password : this.state.Pass,
                name : this.state.Name
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user.name){
                this.props.loadUser(user)
                this.props.onRoutechange('home');
            }
        }) 
    }

    render(){
        return (
            <article className="br3 ba b--black-10 w-100 w-50-m w-25-l mw7 center shadow-5">
                <div action="sign-up_submit" method="get" accept-charset="utf-8">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0 pb0">
                    <legend className="f1 fw6 ph0 mh0 pt3">Register</legend>
                    <div className="h-20">
                    <input className="input-reset ba bg-transparent hover-bg-black hover-white w-100 h3 f3" 
                        type="text" 
                        name="name"  
                        id="name"
                        onChange = {this.onNamechange}
                        />
                        <label className="db fw6 lh-copy f4 pt2" for="name">Name</label>
                        
                    </div>
                    <div className="">
                    <input className="input-reset ba bg-transparent hover-bg-black hover-white w-100 h3 f3" type="email" name="email-address"  id="email-address" onChange = {this.onEmailchange}/>
                        <label className="db fw6 lh-copy f4 pt2" for="email-address">Email address</label>
                        
                    </div>
                    <div className="">
                    <input className="input-reset ba bg-transparent hover-bg-black hover-white w-100 h3 f3" type="password" name="password"  id="password" onChange = {this.onPasschange}/>
                        <label className="db fw6 lh-copy f4 pt2" for="password">Password</label>
                        
                    </div>
                </fieldset>
                <div className="mt0 center mb3 pb0 mt4">
                    <input onClick={this.onSubmitsignin} className="ph2 pv3 input-reset ba b--white-025 bg-transparent grow pointer f4 pb0 fw5 underline" type="submit" value="Register"/>
                </div>
                </div>
        </article>
    )
    }
}

export default Register;
