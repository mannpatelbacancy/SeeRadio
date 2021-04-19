import React from 'react'
import Dropzone from 'react-dropzone'

const Test=props=>{
    return(
        <React.Fragment>
            <Dropzone onDrop={acceptedFiles => console.log("dcd"+JSON.stringify(acceptedFiles))}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>
        </React.Fragment>
    );
}

export default Test;