import {useState} from 'react';

function useInputChange(initialState){

    const [value, setValue] = useState(initialState)
    function changeValue(e){
       setValue(e.target.value)
    }
    return{
      value,
      onChange: changeValue
    }
}

export default useInputChange