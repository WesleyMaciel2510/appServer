import twilio from "twilio";
import { AccountSID, AuthToken } from "../../src/.env/SMSValidatorKey";

const client = twilio(AccountSID, AuthToken);
console.log(AccountSID, AuthToken);

function generateVerificationCode() {
  // Generate a random 6-digit number, ensuring it's not prefixed by zeros
  return Math.floor(100000 + Math.random() * 900000);
}

export const sendVerificationSMS = async (phoneNumber: string) => {
  const verificationCode = generateVerificationCode();
  console.log("chamou sendVerificationSMS");
  console.log("verificationCode = ", verificationCode);
  console.log("phoneNumber = ", phoneNumber);

  try {
    const message = await client.messages.create({
      body: "teste",
      /* body: `\n
      Olá!\n 
      Obrigado por utilizar nosso aplicativo.\n
      Foi realizada uma requisição para validar o número: ${phoneNumber}\n \n
      Insira este código no seu aplicativo: ${verificationCode} \n \n

      IMPORTANTE: Para sua segurança, jamais compatilhe este código com terceiros.
      
      Atenciosamente, \n
      Equipe de Desenvolvimento Mobile.
      `, */
      to: phoneNumber,
      from: "+13342768937",
    });
    console.log("Message sent:", message.sid);
    return verificationCode;
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};
