import React, { useState, useContext } from 'react';

//import component
import Logo from '../../dumb/Logo'
import ImageLinkForm from '../../dumb/ImageLinkForm'
import Rank from '../../dumb/Rank'
import FaceRecognition from '../../dumb/FaceRecognition'
import {User} from '../../dumb/context'
import useInputChange from '../../dumb/useInputChange'

function Screen(props) {
  const user = useContext(User)
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [entries, setEntries] = useState(user.entries);
  const input = useInputChange('')

//---------- method
  function calculateFaceLocation(data) {
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

  function displayFace(box) {
    setBox(box)
  }
  async function onButtonSubmit() {
      try{
          setImageUrl(input.value)
          const fetch1 = await fetch('https://radiant-hamlet-18347.herokuapp.com/imageurl', {
          method:'post',
          headers:{
            'Content-Type':'application/json'},
          body: JSON.stringify({
            input:input.value
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
                id: user.id
              })
            })
            const response2 = await fetch2.json();
            setEntries(response2)
            displayFace(calculateFaceLocation(response))
          }
          return respond
      }catch(error){
        console.log(error, 'something went wrong')
      }
  }
//-------------- render
    return (
        <> 
            <Logo />
            <Rank  entries={entries}/>
            <ImageLinkForm  onInputChange={input.onChange} onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/> 
        </>   
    );
}
export default Screen;
