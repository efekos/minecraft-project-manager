import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { window } from 'vscode';

const dir = join(process.env.APPDATA as string, '.minecraft', '.vscode', 'ignoreNots');
export namespace notifications {
    /**
     * Shows an information message.
     * @param message message to send
     * @param id noti id for dnsa stuff
     * @param items options to do
     * @returns one of the `items` if message sent and user clicked. `undefined` if user didn't click anything or message didn't sent.
     * @since 0.0.4
     * @method
     */
    export function sendInformationMessage<T extends string>(message: string, id: string, ...items: T[]): Thenable<T | undefined> {
        const rest = items;
        rest.push('Do not show again' as T);
        if (!existsSync(join(dir, id))) {
            const msg = window.showInformationMessage(message, ...rest);

            msg.then(async v => {
                if (v === 'Do not show again') {
                    if (!existsSync(dir)) { await mkdirSync(dir, { recursive: true }); }

                    await writeFileSync(join(dir, id), 'ignore', { encoding: 'utf-8' });
                }
            });
            return msg;
        }
        return Promise.resolve(undefined);
    }

    /**
      * Shows an error message.
      * @param message message to send
      * @param id noti id for dnsa stuff
      * @param items options to do
      * @returns one of the `items` if message sent and user clicked. `undefined` if user didn't click anything or message didn't sent.
      * @since 0.0.4
      * @method
      */
    export function sendErrorMessage<T extends string>(message: string, id: string, ...items: T[]): Thenable<T | undefined> {
        const rest = items;
        rest.push('Do not show again' as T);
        if (!existsSync(join(dir, id))) {
            const msg = window.showErrorMessage(message, ...rest);

            msg.then(async v => {
                if (v === 'Do not show again') {
                    if (!existsSync(dir)) { await mkdirSync(dir, { recursive: true }); }

                    await writeFileSync(join(dir, id), 'ignore', { encoding: 'utf-8' });
                }
            });
            return msg;
        }
        return Promise.resolve(undefined);
    }

    /**
     * Shows a warning message.
     * @param message message to send
     * @param id noti id for dnsa stuff
     * @param items options to do
     * @returns one of the `items` if message sent and user clicked. `undefined` if user didn't click anything or message didn't sent.
     * @since 0.0.4
     * @method
     */
    export function sendWarningMessage<T extends string>(message: string, id: string, ...items: T[]): Thenable<T | undefined> {
        const rest = items;
        rest.push('Do not show again' as T);
        if (!existsSync(join(dir, id))) {
            const msg = window.showWarningMessage(message, ...rest);

            msg.then(async v => {
                if (v === 'Do not show again') {
                    if (!existsSync(dir)) { await mkdirSync(dir, { recursive: true }); }

                    await writeFileSync(join(dir, id), 'ignore', { encoding: 'utf-8' });
                }
            });
            return msg;
        }
        return Promise.resolve(undefined);
    }
}