import React, { useState } from 'react'
import React, { useRef } from 'react'
import './Quiz.css'
import {data} from '../../assets/data'

export const Quiz = () => {
    let[index,setIndex]=useState(0);
    let[score,setScore]=useState(0);
    let[question,setQuestion]=useState(data[index]);
    let[choices,setChoices]=useState(question.choices);
    let[correct_choice,setCorrect_choice]=useState(question.correct_choice);
    let[lock,setlock]= useState(false);
    let[degree,setDegree]=useState(false);

    choices[1]=useRef(null);
    choices[0]=useRef(null);
    choices[3]=useRef(null);
    choices[4]=useRef(null);
    let choices_array=[choices[0],choices[1],choices[2],choices[3]]
    const checkAns =(e, correct_choice) => {
        e.preventDefault()
        if(lock=== false){
            if(correct_choice===choices[index]){
                setScore(score+1)
                e.target.classList.add("correct")
                setlock(true);
            }else{
                e.target.classList.add("wrong")
                setlock(true);
                choices_array[correct_choice-1].current.classList.add("correct");
            }
        }
        
        }
        const next = () => {
            if(lock===true){
                if(index===data.length-1){
                    setDegree(true)
                return 0;
                }
                setIndex(index+1)
                setQuestion(data[index])
                setChoices(question.choices)
                setCorrect_choice(question.correct_choice)
                setlock(false);
                choices_array.map((choice)=>{
                    choice.current.classList.remove("correct");
                    choice.current.classList.remove("wrong");
                    return null;
                })
            }
        }
        const start=()=>{
            setIndex(0);
            setQuestion(data[index]);
            setScore(0);
            setlock(false);
            setDegree(0);
        }
  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {degree?<></>:<><h2>{index+1}. {question.question}</h2>
      <ul>
        <li ref={choices[0]} onClick={(e)=>{checkAns(e,2)}}>{question.choices[index]}</li>
        <li ref={choices[1]} onClick={(e)=>{checkAns(e,3)}}>{question.choices[index]}</li>
        <li ref={choices[2]} onClick={(e)=>{checkAns(e,4)}}>{question.choices[index]}</li>
        <li ref={choices[3]} onClick={(e)=>{checkAns(e,1)}}>{question.choices[index]}</li>
        
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">{index+1} / {data.length} questions</div>
      </>}
      {degree?<><h2>you scored {score}/{data.length}</h2>
      <button onClick={reset}>Start</button>
      </>:<></>}
    </div>
  )
}
