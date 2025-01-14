/*
 * Copyright (c) 2025 Adria Claret <adria.claret@gmail.com>
 * MIT Licensed
 */

import { request } from 'node:https';
import { ClientRequest, IncomingMessage} from "node:http";
import {HoapParser} from "@parser/HoapParser";
import {Result, SoapRequest, SoapRequestAbortFn} from "@shared/Types";
import {Socket} from "node:net";

export class Https {
    public do(host: string, parser: HoapParser): SoapRequest {
        const options = {
            hostname: "www.dataaccess.com",
            path: "/webservicesserver/NumberConversion.wso",
            method: 'POST',
            headers: { 'Content-Type': 'text/xml; charset=utf-8' }
        };

        let client: ClientRequest | null = null;

        const promise = new Promise<Result>((resolve: (data: Result) => void, reject: (error: Error) => void): void => {
            client = request(options, (readable: IncomingMessage): void => {
                parser.parse(readable)
                    .then((data: Result): void => resolve(data))
                    .catch((error: Error): void => {
                        client!.destroy();

                        reject(error);
                    });
            });

            //client.on('socket', (socket:Socket) => console.log(socket))

            client.write(this.buildRequest());
            client.end();
        });

        const abort: SoapRequestAbortFn = (): void => {
            if (!client) {
                return;
            }

            client.destroy();
        };

        return { promise, abort };
    }
    private buildRequest(): string {
        return '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><NumberToDollars xmlns="http://www.dataaccess.com/webservicesserver/"><dNum>500</dNum></NumberToDollars></soap:Body></soap:Envelope>'
    }
}