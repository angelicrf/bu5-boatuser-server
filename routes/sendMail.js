const Mailjet = require('node-mailjet')

const mailjet = new Mailjet({
    apiKey: '6cd68fea322c1e176923b684b4aa43d8',
    apiSecret: 'abf29ab2bd05fac2c4af40387302c130'
});

const postEmail = (clName, thisSubject, thisText) => {
    return new Promise((resolve, reject) => {
        const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: "angelicrf@gmail.com",
                            Name: `${clName}`
                        },
                        To: [
                            {
                                Email: "angelicrf@gmail.com",
                                Name: "Receiver"
                            }
                        ],
                        Subject: `${thisSubject}`,
                        TextPart: `client ${clName} sent you this message: ${thisText}`,
                        HTMLPart: "<h3>Dear client welcome</h3><br />Your email has been sent"
                    }
                ]
            })

        request
            .then((result) => {
                console.log(result.body)
                return resolve(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
                return reject(err)
            })
    })

}
module.exports = { postEmail }