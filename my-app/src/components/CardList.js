import React, {useState, useEffect, createRef} from 'react'
import axios from 'axios';
import '../styling/StudentCard.css';

const CardList = () =>{

    const [items, setItems]= useState([]);
    const [searchInput, setSearchInput]= useState('');
    /**this displays the current tags */
    const [tags, setTags]= useState([]);
    /** this displays the input tag value */
    const [inputTag,setInputTag]= useState(" ")


    




  const showGrades = (e)=>{
      const sibClass = e.target.previousSibling.lastChild.classList;
      sibClass.toggle('hide');
        if (sibClass.contains('hide')) {
            e.target.innerHTML = '&plus;';
         } else {
             e.target.innerHTML = '&minus;';
    }
  }
  

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
                                {tags.map((tag,index)=>(
                                   <li key={index}>
                                   <span>{tag}</span>
                                   <i className="material-icons">close</i>
                               </li>
                                ))}
                                
                                <input
                type="text"
                placeholder="Press enter to add tags"
                
            />
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