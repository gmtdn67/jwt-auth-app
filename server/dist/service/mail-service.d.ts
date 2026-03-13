declare class MailService {
    private transporter;
    constructor();
    sendActivationMail(to: string, link: string): Promise<void>;
}
declare const _default: MailService;
export default _default;
//# sourceMappingURL=mail-service.d.ts.map