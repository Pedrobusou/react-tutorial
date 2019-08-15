import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './js/Game';

ReactDOM.render(<Game boardXLength={3} boardYLength={3} />, document.getElementById('root'));