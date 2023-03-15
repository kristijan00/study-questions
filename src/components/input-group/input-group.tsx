import React from 'react';
import styles from '../../containers/login/login.module.css';

interface Props {
  labelName: string;
  value: string;
  type?: string;
  setState: (email: string) => void;
}

const InputGroup: React.FC<Props> = props => {
  return (
    <div className={styles.group}>
      <input onChange={e => props.setState(e.target.value)} value={props.value} type={props.type ? props.type : 'text'} required />
      <span className={styles.highlight}></span>
      <span className={styles.bar}></span>
      <label>{props.labelName ? props.labelName : ''}</label>
    </div>
  );
};

export default InputGroup;