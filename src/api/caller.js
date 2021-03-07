
export default async function caller(url, method, body) {
    console.log(url)
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: body
    }).then((response) => {
        console.log(response)
        return response;
    }).catch((err) => {
        return err;
    })
}