import prompt from "prompt";
import promptQRCode from "../../prompts/prompt-qrcode.js";
import handle from "./handle.js";

async function createQRCode() {
    prompt.start();
    prompt.get(promptQRCode, handle);
}

export default createQRCode;