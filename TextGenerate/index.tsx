import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { staticCode } from './sampleCode';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sublime } from '@uiw/codemirror-theme-sublime';

var intervalId: any;
export default function TextGenerate() {
  // Write your code here
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const startGenerating = () => {
    if (isGenerating) {
      return;
    }
    setIsGenerating(true);
  };

  const reset = () => {
    setText('');
    setIsGenerating(false);
    clearInterval(intervalId);
  };

  useEffect(() => {
    let index = 0;

    const generateText = () => {
      if (index < staticCode.length) {
        setText((text) => text + staticCode.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
        setIsGenerating(false);
      }
    };

    if (isGenerating) {
      intervalId = setInterval(generateText, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isGenerating]);
  return (
    <React.Fragment>
      <div className={styles.buttonsContainer}>
        <button onClick={startGenerating} className={styles.button}>
          Start Generating
        </button>
        <button onClick={reset} className={styles.button}>
          Reset
        </button>
      </div>
      <div className={styles.container}>
        <CodeMirror
          value={text}
          height="300px"
          className={styles.codeMirror}
          extensions={[javascript({ jsx: true })]}
          theme={sublime}
        />
      </div>
    </React.Fragment>
  );
}
