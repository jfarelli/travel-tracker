export let getData = ( dataType ) => {
    return fetch( `http://localhost:3001/api/v1/${ dataType }` )
        .then( response => {
            // console.log( response )
            return response.json() 
        })
        .catch( error => console.log( error ) );
}

