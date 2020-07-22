import dotenv from "dotenv";

//Load env variables from .env
dotenv.config();

const port = process.env.PORT || 5000;
const captchaUrl = process.env.CAPTCHA_VERIFICATION_URL;
const captchaSecret = process.env.CAPTCHA_SECRET;

export { captchaSecret, captchaUrl, port };
