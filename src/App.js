import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import './App.css';
import Particles from 'react-particles-js';

const party ={
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 300
      }
    },
}
}


const initialState = {
    input: '',
    imageUrl: '',
    selectedFile: null,
    box: {},
    route: 'signin',
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}
class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  stuff = (event) => {
    const fileList = event.target.files;
    let file = fileList[0];
    if (file.type && file.type.indexOf('image') === -1) {
        console.log('File is not an image.', file.type, file);
        return;
      }
    
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
          console.log(event.target.result)
        this.setState({input: event.target.result});

      });
      reader.readAsDataURL(file);
} 

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = (event) => {
    event.preventDefault();
    this.setState({imageUrl: this.state.input});
    fetch('https://boiling-lake-36219.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://boiling-lake-36219.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
      })
      .then(response => response.json())
      .then(data => {
        this.setState(Object.assign(this.state.user, { entries: data}))
      })
      .catch(err => console.log(err))
      };
      this.setState({box : this.calculateFaceLocation(response)})
    })
    .catch(err => console.error(err))
  }

  
  
  render() {    
    return (
      <div className="App">
        <Particles className='particles' params={party}/>
        {
          this.state.route === "home"
        ? <div>
            <Navigation onRouteChange={this.onRouteChange}/>
            <Logo/>
            <Rank name={this.state.user.name} rank={this.state.user.entries}/>
            <ImageLinkForm stuff={this.stuff} onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} input={this.state.input}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        : this.state.route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>     
      }
      </div>
    );
  }
}

export default App;
