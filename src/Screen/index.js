import React, { useState } from 'react';
import { PropTypes as T } from 'prop-types';

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

//---------- method
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
  const onButtonSubmit = async () => {
      try{
          setImageUrl(input)
          const fetch1 = await fetch('https://radiant-hamlet-18347.herokuapp.com/imageurl', {
          method:'post',
          headers:{
            'Content-Type':'application/json'},
          body: JSON.stringify({
            input:input
            })
          })
          const response = await fetch1.json();
          const respond = await response;
          if(response){
            const fetch2 = await fetch('https://radiant-hamlet-18347.herokuapp.com/image', {
              method:'put',
              headers:{
                'Content-Type':'application/json'},
              body: JSON.stringify({
                id: props.id
              })
            })
            const response2 = await fetch2.json();
            await setEntries(response2)
          }
          displayFace(calculateFaceLocation(response))
          return respond
      }catch(error){
        console.log(error, 'something went wrong')
      }
  }
//-------------- render
    return (
        <div> 
            <Logo />
            <Rank name={props.name} entries={entries}/>
            <ImageLinkForm  onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/> 
        </div>   
    );
}

Screen.propTypes = {
  id: T.number.isRequired,
  name: T.string,
  entries: T.string,
}

Screen.defaultProps = {
  name: '',
  entries: ''
}

export default Screen;
