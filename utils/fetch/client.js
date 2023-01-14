const client = (url) => {
    let auth = Buffer.from(process.env.BACK_USR+":"+process.env.BACK_PWD).toString('base64')

    return fetch(process.env.BACK_API + 'wp-json/' + url, {
        headers: {
            authorization: "Basic " + auth,
        },
    }).then(res => {
        return res.json()
    }).then(data => {
        return data
    })
}

export default client