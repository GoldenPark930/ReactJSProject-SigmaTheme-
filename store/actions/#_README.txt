/*
|-------------------------------------------------------------------------------
| Redux actions
|-------------------------------------------------------------------------------
| These are usual Redux actions that are plain JavaScript
| objects. Actions must have a type property that indicates
| the type of action being performed. Types should typically
| be defined as string constants.
|-------------------------------------------------------------------------------
*/



/*
|-------------------------------------------------------------------------------
| Redux-saga API call actions
|-------------------------------------------------------------------------------
| These are special actions for Redux-saga that extends
| from Redux actions. They are still plain JavaScript
| object but they have more required properties that will
| be used by Redux-saga to handle the action properly.
|
| Required properties:
|   type - indicates the type of action being performed
|   subtypes - an object that has a list of actions names
|     to control the whole lifecycle of the remote request
|     Example:
|       {
|         START: 'action_name',
|         SUCCESS: 'action_name',
|         END: 'action_name',
|       }
|   promise - a function that will emit the actual remote
|     request and return a promise that will be resolved
|     by Redux-saga
|
| Optional properties:
|   placeholderData - if present Redux-saga will consider
|     that as a result from the resolved promise instead
|     of actual promise result
|   onSuccessCallback - if present Redux-saga will call it
|     if the the remote request ended with success status
|-------------------------------------------------------------------------------
*/
