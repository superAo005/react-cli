/**
 * Created by mikejay on 2021/4/13.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout';

ReactDOM.render(<App/>,document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
