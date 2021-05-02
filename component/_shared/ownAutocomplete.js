import React ,{useEffect, useState} from 'react';



const OwnAutoComplete = (props)=>{
    return (
        <>
        <div className="own-custom-autocomplete position-relative">
            <div className="input-wrapper">
                <input className="autocomplete-input form-control" value={props?.value} placeholder={props?.placeholder} onChange={(e)=>props?.onChange(e)}/>
            </div>

            {props?.items?.length>0 && props?.renderItem &&

            <div className="list-container">
                <ul className="list-unstyled mb-0">
                    {props?.items.map((data, index)=>(
                        <li key={index} onClick={()=>props.onSelect(data[props?.renderValue])}>{data[props?.renderValue]}</li>
                    ))}
                    
                </ul>
            </div>
}
        </div>
        </>
    )
}

export default OwnAutoComplete