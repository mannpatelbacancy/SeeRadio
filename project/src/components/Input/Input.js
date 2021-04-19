import React from 'react';
import {Label,Input} from 'reactstrap';
import Dropzone from 'react-dropzone';

const input = ( props ) => {
    let inputElement=null;
    let spanStyle=props.spanStyle;
    let invalid=props.invalid
    let names='code';
    switch(props.elementType){
        case('input'):
        inputElement=<div className="form-group ">
        <Label className={props.labelClass}>{props.label}
        <span style={{color:props.spanStyle.color,fontSize:props.spanStyle.fontSize}}>*</span></Label>
        <Input className={props.inputClassName} invalid={invalid} disabled={props.disabled} name={props.name} placeholder={props.placeholder} type={props.type} value={props.value} onChange={props.changed} required/>
        </div>
        break;
        case('select'):
        
        inputElement=<div className="form-group ">
        <Label className="text-black font-weight-bold fw-700 fs-14 mb-0">{props.label}
        <span style={{color:props.spanStyle.color,fontSize:props.spanStyle.fontSize}}>*</span></Label>
        <Input className="form-control form-control-sm"  name={props.name}  type="select" value={props.value} onChange={props.changed} required>
                    {props.options.map(option =>(
                        <option key={option.code} value={option.code}>
                            
                            {option.name}
                        </option>
                    ))}
                    {/* <option>Canada</option>
                    <option>india</option>
                    <option>us</option> */}
        </Input>
        </div>
        break;
        case('textarea'):
        inputElement=<div className="form-group ">
        <Label className={props.labelClass}>{props.label}
        <span style={{spanStyle}}>*</span></Label>
        <Input className={props.inputClassName}  name={props.name} placeholder={props.placeholder} type={props.type} value={props.value} onChange={props.changed} required/>
        </div>
        break;
        case('dropzone'):
        inputElement=<Dropzone onDrop={acceptedFiles =>acceptedFiles.forEach(file=>{
            // props.onChange(file,props.name)
            console.log(JSON.stringify(file)+"hjjh");
        })}>
        {({getRootProps, getInputProps}) => (
            <section>
                        <div  {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={{height:'60px',width:'100%'}} className="mt-2">{props.icon}{props.message}</p>
            </div>
            </section>
        )}
        </Dropzone>
        break;
        default:
            return;
    }
    return (
        <div>
            {inputElement}
        </div>
    );

};

export default input;