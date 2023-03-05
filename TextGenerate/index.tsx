import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { staticCode } from '../TextGenerate/sampleCode';

var timer: any;
export default function TextGenerate() {
  const [code, setCode] = useState('// Click Start Generating to see magic');
  const [started, setStarted] = useState(false);

  const startCreating = () => {
    let i = 0;
    let generatedCode = '';

    timer = setInterval(() => {
      if (i === staticCode.length - 1) clearInterval(timer);
      generatedCode = generatedCode + staticCode[i];
      i++;
      setCode(generatedCode);
    }, 10);
  };

  const handleGenerate = () => {
    setStarted(true);
  };
  const handleReset = () => {
    setCode('//  Click Start Generating to see magic');
    clearInterval(timer);
    setStarted(false);
  };

  useEffect(() => {
    console.log('started', started);
    if (started) {
      console.log('called ');
      startCreating();
    }

    return () => {
      clearInterval(timer);
    };
  }, [started]);
  return (
    <React.Fragment>
      <div className={styles.buttonsContainer}>
        <button onClick={handleGenerate} className={styles.button}>
          Start Generating
        </button>
        <button onClick={handleReset} className={styles.button}>
          Reset
        </button>
      </div>
      <div className={styles.container}>
        <CodeMirror
          value={code}
          height="300px"
          className={styles.codeMirror}
          extensions={[javascript({ jsx: true })]}
          theme={sublime}
        />
      </div>
    </React.Fragment>
  );
}
