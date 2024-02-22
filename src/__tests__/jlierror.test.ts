
import * as https from 'node:https';
import JLIError from '../models/jlierror';
import { ClientRequest } from 'node:http';

jest.mock('node:https')


const token = '123ABC';

describe('jlierror class', () => {

    describe('log', () => {
        it('should successfully log a basic error request', async () => {
            const logger = new JLIError();
            logger.message = 'error message';
            logger.stack = 'error stack';

            await logger.log(token);
            expect(https.request).toHaveBeenCalledWith({});
        });
    });
});