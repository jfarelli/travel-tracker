export let getData = ( dataType ) => {
    return fetch( `http://localhost:3001/api/v1/${ dataType }` )
        .then( response => {
            // console.log( 'GET RESPONSE: ', response )
            return response.json() 
        })
        .catch( error => console.log( error ) );
}


export let postData = ( data ) => {
    console.log('DATA: ', data)
    return fetch( 'http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify( data ),
        headers: {
            'Content-Type': 'application.json'
        }
    }).then( response => checkForError( response ) )
    .then( response => {
        // console.log( 'POST RESPONSE: ', response )
        return response.json() 
    })
    .catch( error => console.log( error ) )
}


const checkForError = ( response ) => {
    if ( response.ok ) {
      return response
    } else {
      throw new Error( response.status )
    }
  }