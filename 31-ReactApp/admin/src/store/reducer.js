import { combineReducers } from 'redux-immutable';

import { reducer as toolsReducer }  from 'pages/tools/store';

export default combineReducers({
    tools:toolsReducer
})