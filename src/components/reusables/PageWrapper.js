import React from 'react'
import Header from './Header';


function PageWrapper(props, pickedJobId){

    return (        
    <div className='container flex-col background'>      
        <div className='flex-row header'>
        <Header user={props.user} setUser={props.setUser} pickedJobId={pickedJobId}/></div>
              
    <div className='flex-row body'>   
     {props.children}
     </div>

    </div>
    )
    
    
}

export default PageWrapper