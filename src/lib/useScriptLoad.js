import React, {useState, useEffect} from 'react';

function useScriptLoad(){
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        const scriptTag = document.createElement('script');
        scriptTag.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCGl8sqzeeaWoteHK3fFSQXppSSIex0ZUY&libraries=places';
        scriptTag.addEventListener('load', ()=>setLoaded(true));
        document.body.appendChild(scriptTag);
    },[]);

    useEffect(()=>{
        if(!loaded) return;
    }, [loaded]);

    return [loaded];
}

export default useScriptLoad;