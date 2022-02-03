import { SmtpFlow } from "./flow";
import { SmtpSession } from "./server";
import { SmtpComponent, SmtpComponentConfig } from "./component";
import { SMTPServerAddress, SMTPServerAuthentication } from "smtp-server";

export class SmtpFilter<T extends SmtpComponentConfig = SmtpComponentConfig> extends SmtpComponent<T> {
  name: string;
  flow: SmtpFlow;
  config: T;

  async onAuth(auth: SMTPServerAuthentication, session: SmtpSession): Promise<boolean | undefined> {
    return undefined;
  }
  async onConnect(session: SmtpSession): Promise<boolean | undefined> {
    return undefined;
  }
  onMailFrom(address: SMTPServerAddress, session: SmtpSession): Promise<boolean | undefined> {
    return undefined;
  }
  onRcptTo(address: SMTPServerAddress, session: SmtpSession): Promise<boolean | undefined> {
    return undefined;
  }
  onData(session: SmtpSession): Promise<boolean | undefined> {
    return undefined;
  }

  static registry = {};

  static register(type: string, constructor) {
    SmtpFilter.registry[type] = constructor;
  }

  static get(flow: SmtpFlow, config: SmtpComponentConfig): SmtpFilter {
    return new SmtpFilter.registry[config.type](flow, config);
  }

  getState(session: SmtpSession) {
    return session[`${this.flow.name}_${this.name}`];
  }

  setState(session: SmtpSession, state: any) {
    session[`${this.flow.name}_${this.name}`] = state;
  }
}
