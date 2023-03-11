import * as nodemailer from 'nodemailer'

// export default async (email: string, code: string) => {
//     let test = await nodemailer.createTestAccount()
//
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'inflexibilidade@gmail.com',
//             pass: 'kwubbhyjwmjyamuu'
//         }
//     })
//
//     const link = `http://localhost:5000/api/users/confirm/${code}`
//
//     const mailOptions = {
//         to: email,
//         subject: 'Подтвердите свой адрес email',
//         html: `
//             <div style="padding: 15px; background: #050505">
//                 <h1 style="font-family: Arial, Helvetica, sans-serif; color: #f5f5f5; margin-bottom: 25px">openwords</h1>
//                 <p style="font-family: Arial, Helvetica, sans-serif; color: #f5f5f5">
//                     Пожалуйста, перейдите по следующей ссылке, чтобы подтвердить свой email:
//                     <a href="${link}" target="_blank">${link}</a>
//                 </p>
//             </div>
//         `
//     }
//
//     await transporter.sendMail(mailOptions)
// }

export default async (email: string, code: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'inflexibilidade@gmail.com',
            pass: 'kwubbhyjwmjyamuu'
        }
    })

    const mailOptions = {
        to: email,
        subject: 'Подтвердите свой адрес email',
        html: `
            <div style="padding: 15px; background: center / cover no-repeat url() #050505">
                <h1 style="font-family: Arial, Helvetica, sans-serif; color: #f5f5f5; margin-bottom: 25px">openwords</h1>
                <p style="font-family: Arial, Helvetica, sans-serif; color: #f5f5f5">
                    ${code}
                </p>
            </div>
        `
    }

    await transporter.sendMail(mailOptions)
}
