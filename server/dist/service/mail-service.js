"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Активация аккаунта на ' + process.env.API_URL,
                text: '',
                html: `
          <div>
            <h1>Для активации пройдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
            });
            console.log('Сообщение отправлено на почту ' + to);
        }
        catch (error) {
            console.log('Ошибка: ' + error);
        }
    }
}
exports.default = new MailService();
//# sourceMappingURL=mail-service.js.map