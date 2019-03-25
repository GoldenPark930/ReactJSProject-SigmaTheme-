/*
|-------------------------------------------------------------------------------
| Redux actions types
|-------------------------------------------------------------------------------
| These are regular Redux actions types that are simple
| string constant. They are used in regular Redux actions.
|
| Actions types naming mask:
|   {FILE_NAME}__{ACTION_TYPE}__{STATUS}: '{FileName}.{actionType}:{status}'
|
| Where:
|   FileName    required
|   actionType  required
|   status      optional
|
| The idea is to make action type more informative in terms of what
| that action does and where it lives.
|-------------------------------------------------------------------------------
*/



/*
|-------------------------------------------------------------------------------
| Redux-saga API call actions subtypes
|-------------------------------------------------------------------------------
| These are special actions subtypes for Redux-saga.
| They are group of regular Redux actions types which use
| the same naming mask as regular Redux actions types.
|
|     Example:
|       {
|         START: 'action_name',
|         SUCCESS: 'action_name',
|         END: 'action_name',
|       }
|-------------------------------------------------------------------------------
*/