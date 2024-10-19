# justlogit-node
Library for JustLog.IT which supports modern javascript ES6 import and module syntax.


## Installation
npm install @justlogit/node --save

## Requirements
Make sure you have set up a JustLog.IT account and set up your application for logging.  You
will need to the application logging token to run this library.

## Methods
logError(obj);

logPerformance(method, timing, [user], [details]);

logEvent(name, description, [user]);

logInformation(method, details, [user]);


## Usage
import { Logger } from "@justlogit/node";

const logger = new Logger('<logging token>');

try {
    ... do something that generates an error
}
catch(err) {
    const stateValues: Array<StateValue> = [];
    stateValues.push(key, value);

    void logger.logError(errorObject, user, stateValues);
}


