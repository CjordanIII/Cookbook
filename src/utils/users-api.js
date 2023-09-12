
const BASE_URL = '/api/users'


export async function signUP(userData){

    console.log('API USER-DATA',userData)
    const res = await fetch(BASE_URL,{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        // turn userData into jason string
        body: JSON.stringify(userData)// from js to json
    })
    if (res.ok){
        return res.json()// from json data to js
    }else{
        throw new Error('Invalid Sign Up')
    }
}