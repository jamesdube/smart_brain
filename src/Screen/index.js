import React, { useState } from 'react';

//import component
import Logo from '../components/Logo'
import ImageLinkForm from '../components/ImageLinkForm'
import Rank from '../components/Rank'
import FaceRecognition from '../components/FaceRecognition'

function Screen(props) {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [entries, setEntries] = useState(props.entries);

  const calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFace = (box) =>{
    setBox(box)
  }

  const onInputChange = (event) =>{
    setInput(event.target.value)
  }

  const onButtonSubmit = () =>{
    setImageUrl(input)
    fetch('https://radiant-hamlet-18347.herokuapp.com/imageurl', {
       method:'post',
      headers:{
        'Content-Type':'application/json'},
      body: JSON.stringify({
        input:input
        })
    })
    .then(response=> response.json())
      .then(response =>{
      if(response){
        fetch('https://radiant-hamlet-18347.herokuapp.com/image', {
          method:'put',
          headers:{
            'Content-Type':'application/json'},
          body: JSON.stringify({
            id: props.id
          })
        })
          .then(response => response.json())
          .then(count =>{
            setEntries(count)
          })
          .catch(console.log)
          } 
          displayFace(calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }
    return (
        <div> 
            <Logo />
            <Rank name={props.name} entries={entries}/>
            <ImageLinkForm  onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/> 
        </div>   
    );
}

export default Screen;
