const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env.js');
const Mailgen = require('mailgen');

// this is based on ethereal email handler that generate temporary mail & password
// check the secnd function

const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'halle50@ethereal.email',
      pass: 'HbPwbGctdmjuR5vkmA',
    },
  });

  let message = {
    from: '"Muhammad Usman" <usmansoormo1234@gmail.com>',
    to: 'usmansoormo1234@gmail.com',
    subject: 'Test nodemailer',
    text: 'Hello world',
    html: '<strong>Hello node mailer</strong>',
  };

  await transporter
    .sendMail(message)
    .then((info) =>
      res
        .status(200)
        .json({ message: 'you should recieve an email', info: info })
    )
    .catch((err) => {
      console.log('error in err: :', err);
      return res.status(500).json({ error: err });
    });
  console.log('message: ', message);

  res.status(201).json('signup succesfully');
};

// send email fronm real gamil accoit
const getbill = async (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Mailgen',
      link: 'https://mailgen.js/',
    },
  });
  let response = {
    body: {
      name: 'muhammad usman',
      intro: 'Your bill has arrived!',
      table: {
        data: [
          {
            item: 'Nodemailer stack book',
            description: 'A Beckend application',
            price: '1000 PKR',
          },
        ],
      },
      outro: 'Looking forward to do more business',
    },
  };

  let mail = MailGenerator.generate(response);
  console.log('mail :', mail);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: 'place order',
    html: mail,
  };

  await transporter
    .sendMail(message)
    .then(() => {
      res.status(200).json({
        message: 'you should recieve an email',
      });
    })
    .catch((error) => {
      res.json({
        error,
      });
    });
  // res.status(201).json("getbill sucessfully")
};

module.exports = {
  signup,
  getbill,
};
