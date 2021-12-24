import React, {useState, useEffect, createRef} from 'react'
import axios from 'axios';
import '../styling/StudentCard.css';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';

const CardList = () =>{

    //students info
    const [items, setItems]= useState([]);

    //filter search data
    const [searchInput, setSearchInput]= useState('');
    
    //toggle to show and hide all grades
    const showGrades = (e)=>{
      const sibClass = e.target.previousSibling.lastChild.classList;
      sibClass.toggle('hide');
        if (sibClass.contains('hide')) {
            e.target.innerHTML = '&plus;';
         } else {
             e.target.innerHTML = '&minus;';
        }
    }
 
    /* Tags data */
    const [ toDoList, setToDoList ] = useState([])
    const addTask = (userInput ) => {
        let copy = [...toDoList];
        copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
        setToDoList(copy);
    }
  
    //calling the Api
    useEffect(()=>{
        axios
        .get("https://api.hatchways.io/assessment/students")
          .then(res=>{
            console.log('itemlistttttttt: ', res.data)
            setItems(res.data.students)
          })
          .catch((err)=>{
              console.log("the error is:", err)
          })
      },[])
    
    return(
        <div>
            <div className='input-flex'>
                <input className='input-search' type="text" placeholder='Search by name' onChange={(e)=> setSearchInput(e.target.value)} />
                <input className='input-search' placeholder='Search for tag'/>
            </div>
      
            {items.filter((val)=>{
                if(searchInput == ""){
                    return val
                } else if(val.firstName.toLowerCase().includes(searchInput.toLowerCase())){
                    return val
                }
                else if(val.lastName.toLowerCase().includes(searchInput.toLowerCase())){
                    return val
                }
                
            }).map((card, index)=>{
                //find the average total grade
                const fullName = card.firstName + ' ' + card.lastName;
    
                const avg = card.grades.reduce((sum, curr)=>sum + Number(curr), 0) / card.grades.length;
                return(
                    <div  className='flexbox-div' key={index}>

                        <div className='student-photo-div'>
                            <img className='students-img-size'  src={card.pic} alt ="student-photo"/>
                        </div>

                        <div className='card-basic-info' key={index}>
                                <h1 className='full-capitalize'>{fullName}</h1>
                                <p>Email: {card.email}</p>
                                <p>Company: {card.company}</p>
                                <p>Skills: {card.skill}</p>
                                <p>Average: {avg} </p>
                        <ToDoList toDoList={toDoList}/>
                        <ToDoForm addTask={addTask}/>

                            
                                <div className="gradeList hide">
                                {card.grades.map((grade, index) => (
                                    <p key={index}>
                                    Test {(index += 1)}: {grade}%
                                    </p>
                                ))}
                                </div>
                            </div>
                        <div className="expand-btn" onClick={showGrades}>
                            +
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}
export default CardList;