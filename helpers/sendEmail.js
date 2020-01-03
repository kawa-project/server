const nodemailer = require('nodemailer');

function sendEmail(user, isRegister) {
    const email = user.email;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.GMAIL_ACCOUNT}`,
            pass: `${process.env.GMAIL_PASSWORD}`
        }
    });

    const mailRegister = {
        from: `${process.env.GMAIL_ACCOUNT}`,
        to: `${email}`,
        subject: 'Registration at Kawa Craft',
        html: `
        <div>
            <h1>Terimakasih ${email} telah mendaftar di Kawa Craft</h1>
            <br>
            <div>
            Kawa Craft adalah pemain baru dibidang produksi sepatu lifestyle
            dengan tema workboots untuk laki-laki berbahan kulit pullup dan
            crazy horse dengan kualitas terbaik. Kawa Berdiri pada tahun 2019
            ,lebih tepatnya 20 Maret 2019 Kawa sendiri merupakan bahasa jepang
            yang artinya kulit. Berslogan “ We Are The Craft of Our Towns “
            yang mencitrakan Kawa sebagai pembuat kerajinan terbaik di Kota
            Bandung.
            </div>
            <br>
            <div>
            Sepatu KAWA mempunyai ciri khas yaitu diproduksi dengan
            menggunakan bahan-bahan berkualitas dan dikerjakan oleh ahli-ahli
            yang berpengalaman sehingga terciptalah sepatu yang mempunyai
            kualitas tinggi, dan mempunyai daya saing global yang di produksi
            di Kota Bandung, Jawa Barat, Indonesia.
            </div>
        </div>
        `
    };

    const mailContactUs = {
        from: `${process.env.GMAIL_ACCOUNT}`,
        to: `${email}`,
        subject: 'Contact Us at Kawa Craft',
        html: `
        <div>
            <h1>Terimakasih ${email} sudah menghubungi kami</h1>
            <br>
            <div>
            Kawa Craft adalah pemain baru dibidang produksi sepatu lifestyle
            dengan tema workboots untuk laki-laki berbahan kulit pullup dan
            crazy horse dengan kualitas terbaik. Kawa Berdiri pada tahun 2019
            ,lebih tepatnya 20 Maret 2019 Kawa sendiri merupakan bahasa jepang
            yang artinya kulit. Berslogan “ We Are The Craft of Our Towns “
            yang mencitrakan Kawa sebagai pembuat kerajinan terbaik di Kota
            Bandung.
            </div>
            <br>
            <div>
            Sepatu KAWA mempunyai ciri khas yaitu diproduksi dengan
            menggunakan bahan-bahan berkualitas dan dikerjakan oleh ahli-ahli
            yang berpengalaman sehingga terciptalah sepatu yang mempunyai
            kualitas tinggi, dan mempunyai daya saing global yang di produksi
            di Kota Bandung, Jawa Barat, Indonesia.
            </div>
        </div>
        `
    };

    if (isRegister) {
        transporter.sendMail(mailRegister, function(err, info) {
            if (err) console.log(err);
            else console.log(info);
        });
    } else {
        transporter.sendMail(mailContactUs, function(err, info) {
            if (err) console.log(err);
            else console.log(info);
        });
    }
}

module.exports = sendEmail;
