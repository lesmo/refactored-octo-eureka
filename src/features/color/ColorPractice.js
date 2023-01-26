import { createSelector } from '@reduxjs/toolkit';
import React from 'react';
import styles from './Color.module.css';
import { actions } from './colorSlice';
import store from '../../app/store';
import { useSelector } from 'react-redux';

const tmpColorsList = [
  '#f00',
  '#0f0',
  '#00f',
  '#ff0',
  '#0ff',
  '#f0f',
  '#fff',
  '#000',
];

const ColorButton = ({color, ...params}) => {
  return (
    <div className={styles.colorButton} style={{ backgroundColor: color }} {...params}></div>
  );
}

export function ColorPractice() {
  const historySelector = ({ color: state }) => {
    const historyLength =  state.colorHistory.length;
    const historyStart = historyLength > 4 ? state.colorHistoryIndex - 4 : 0;
    const historyEnd = state.colorHistoryIndex + 1;
    return state.colorHistory.slice(historyStart, historyEnd);
  };
  const history = useSelector(historySelector);
  const currentColor = history.length > 0 ? history[history.length - 1] : null;
  
  return (
    <div className={styles.dialog}>
      {currentColor && (
        <div className={styles.row}>
          <div className={styles.colorBox} style={{ backgroundColor: currentColor }}></div>
        </div>
      )}
      <div className={styles.row}>
        <button onClick={() => store.dispatch(actions.setPrevColor())}>PREV</button>
        {history.length > 0 ? (
          history.map((color, i) => {
            return <ColorButton key={`${color}-${i}`} color={color} onClick={() => store.dispatch(actions.setColor(color))} />;
          })
        ) : (
          <div>No History</div>
        )}
        <button onClick={() => store.dispatch(actions.setNextColor())}>NEXT</button>
      </div>
      <div className={styles.row}>
        <input className={styles.inputSend} type="text" />
        <button>SEND</button>
        <button onClick={() => store.dispatch(actions.setRandomColor())}>GET COLOR</button>
      </div>
    </div>
  );
}
