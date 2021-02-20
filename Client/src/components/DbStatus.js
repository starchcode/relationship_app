import userEvent from "@testing-library/user-event";
import { useState, useEffect, useRef } from "react";
import './dbStatus.css';

let myInterval;

const DbStatus = ({dbMessage, dbError, setDbError, setDbMessage}) => {

  const errorClass = () => {
    if (myInterval) clearTimeout(myInterval);

    myInterval = setTimeout(() => {
        setDbError(undefined);
        setDbMessage('status')
    }, 4000);

    return dbError === false ? 'success': dbError === true? 'error': 'hidden';
  }
    return(
    <div>
      <p className={` ${errorClass()}`} style={{textAlign:'center', opacity: '0.7'}}>{dbMessage}</p>
    </div>
  );
};

export default DbStatus;

