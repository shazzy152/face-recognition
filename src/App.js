import React , { Component } from 'react';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'; 
import Navigation from './components/Navigation/Navigation'; 
import Logo from './components/Logo/Logo'; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import Rank from './components/Rank/Rank'; 
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin'; 
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'f156317e4e4646c597f62eef4a7ef54f'
});

const particlesOptions = {
    fpsLimit: 60,
    particles: {
      color: {
        value: "#ff7281",
      },
      links: {
        color: "#FF8491",
        distance: 150,
        enable: true,
        opacity: 1,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      number: {
        density: {
          enable: true,
          value_area: 600,
        },
        value: 150,
      },
      opacity: {
        value: 4,
      },
      size: {
        random: true,
        value: 2,
      }
    }
  }

const initialState = {
      input:'', 
      imageURL:'',
      box : {},
      route : 'Signin',
      isSignedin : false,
      user : {
            id: '',
            name : '',
            email : '',
            entries : 0,
            joined : ''
      }
}


class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{       
            id: data.id,
            name : data.name,
            email : data.email,
            entries : data.entries,
            joined : data.joined
    }})

  }

  componentDidMount(){
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(console.log)  
  }

  onInputChange = (event) => {
      this.setState({input:event.target.value});
  }

  calculateLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
      return {
        leftCol : clarifaiFace.left_col * width,
        topRow : clarifaiFace.top_row * height,
        rightCol : width - (clarifaiFace.right_col * width),
        bottomRow : height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (boxed) =>{
    this.setState({box : boxed})
  }

  onButtonClick = () => {
    this.setState({imageURL:this.state.input});
    app.models.predict('a403429f2ddf4b49b307e318f00e528b',
    this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
            method : 'put',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id : this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        }).catch(console.log)
      }
      this.displayFaceBox(this.calculateLocation(response))})
    .catch(err => console.log(err)); 
  }

  onRoutechange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedin : true})
    } 
    this.setState({route:route});
 }

  render(){
    const { isSignedin,box,route,imageURL } = this.state;
    return (
      <div className="App">
          <Particles className="particles" params={particlesOptions} />
          <Navigation isSignedin={isSignedin} onRoutechange={this.onRoutechange} />
          { this.state.route === 'home'
            ? <div> 
                <Logo /> 
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
                <FaceRecognition box={box} imageURL={imageURL} />
              </div>
            : (
              route === 'Signin'
              ? <Signin onRoutechange = {this.onRoutechange} loadUser = {this.loadUser} />
              : ( route ==='signout'
                ? <Signin loadUser = {this.loadUser} onRoutechange = {this.onRoutechange} />
                : <Register loadUser={this.loadUser} onRoutechange = {this.onRoutechange} />
                )
            )
    }
      </div>
    );

  }
}

export default App;
