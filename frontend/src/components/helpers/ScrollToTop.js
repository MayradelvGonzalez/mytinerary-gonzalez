 import { useEffect } from 'react'
 import { useLocation } from 'react-router-dom'

function ScrollToTop(){
    const {pathname} = useLocation();


    useEffect(() => {
    document.documeentElement.ScrollTo({
        top:0,
        lef:0,
        behavior: "smooth",
    });
},[pathname]);
return null;
}

export default ScrollToTop