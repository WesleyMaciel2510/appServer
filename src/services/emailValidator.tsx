import sgMail from "@sendgrid/mail";
import APIKEY from "../../src/.env/sendGridKey";
sgMail.setApiKey(APIKEY);

function generateVerificationCode() {
  // Generate a random 6-digit number, ensuring it's not prefixed by zeros
  return Math.floor(100000 + Math.random() * 900000);
}
export const sendVerificationEmail = async (emailToValidate: string) => {
  console.log("chamou sendVerificationEmail");
  const verificationCode = generateVerificationCode();
  const msg = {
    to: emailToValidate,
    from: "universe.mobile.dev@gmail.com",
    subject: `Confirmação do Email - ${emailToValidate}`,
    text: `\n
        Olá!\n 
        Obrigado por utilizar nosso aplicativo.\n
        Foi realizada uma requisição para validar o e-mail: ${emailToValidate}\n \n
        Insira este código no seu aplicativo: ${verificationCode} \n \n

        IMPORTANTE: Para sua segurança, jamais compatilhe este código com terceiros.
        
        Atenciosamente, \n
        Equipe de Desenvolvimento Mobile.
        `,
    /* html: `<strong>Insira este código no seu aplicativo:</strong> ${verificationCode}`, */
  };

  try {
    await sgMail.send(msg);
    console.log("Verification email sent successfully");
    return verificationCode; // Return the code for further processing in the app
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
