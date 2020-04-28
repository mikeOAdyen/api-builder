import React from 'react';
import { Options } from '../form/Options';
import { cardList } from './cardList';
import { componentList } from './componentList';

export const checkSetupOption = (option, callback) => {
  let result;
  if (option === 'component') {
    result = <Options type='component' list={componentList} callback={callback}/>
  } else if(option === 'Cards') {
    result = <Options type='card' list={cardList} callback={callback}/>;
  }

  return result;
};