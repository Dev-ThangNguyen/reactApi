import { useEffect, useState , useRef } from 'react'
import { courseApi } from './Api.js'
function App() {
  const [courses, setCourese] = useState([])
  const [change, setChange] = useState(false)
  const [index, setIndex] = useState(0)
  const [name, setName] = useState('')
  const [description , setDescription] = useState('')
  const btnClickRef = useRef()
  const btnUpdateRef = useRef()
  const inputRef = useRef()
  useEffect(() => {
    fetch(courseApi)
      .then(res => res.json())
      .then(courses => setCourese(courses))
  }, [change])

  const handlleClick = () => {
    if(name !== '' && description !== '') {
      fetch(courseApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, phone: description})
      })
        .then(res => res.json())
        .then(course => setCourese((prev) => [...prev, course] ))
      setName('')
      setDescription('')
      inputRef.current.focus()
    }
  }

  const handleClose = (id) => {
    fetch(courseApi + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    document.querySelector(`.data-index-${id}`).style.display = 'none'
  }
  const handleEdit = (id, name , description) => {
    setIndex(id)
    setName(name)
    setDescription(description)
    inputRef.current.focus()
    btnClickRef.current.style.display = 'none'
    btnUpdateRef.current.style.display = 'block'
  }

  const handlleUpdate = () => {
    if(name !== '' && description !== '') {
      fetch(courseApi + '/' + index, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: name, phone: description})
      })
      setChange(!change)
      setName('')
      setDescription('')
      inputRef.current.focus()
      btnUpdateRef.current.style.display = 'none'
      btnClickRef.current.style.display = 'block'
    }
  }


  return(
    <>
    <h1 style={{textAlign: 'center'}}>DANH SÁCH THÔNG TIN HỌC VIÊN</h1>
    <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '0 auto'}}>
        <input 
        ref={inputRef}
        style={{marginBottom: 5, padding: 10}} placeholder='Enter Name...' 
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        
        <input
        style={{marginBottom: 5,padding: 10}} 
        placeholder='Enter Description...' 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        
        <button ref={btnClickRef} onClick={handlleClick} style={{padding: 10, backgroundColor: 'green', color: 'white'}}>Create Course</button>
        <button style={{display: 'none', padding: 10, backgroundColor: 'red', color: 'white'}} ref={btnUpdateRef} onClick={handlleUpdate}>Update Course</button>
      </div>
      <ul style={{margin: 0}}>
        {courses.map(course => (
          <li key={course.id} style={{listStyle: 'none',}} className={`data-index-${course.id}`}>
            <h1>
              <button 
                style={{marginRight: 20, cursor: 'pointer', padding: '10px', backgroundColor: 'red', color: 'white'}}
                onClick={() => handleEdit(course.id, course.name, course.phone)}
              >Edit
              </button>   
              <button 
                style={{marginRight: 20, cursor: 'pointer', padding: '10px', backgroundColor: '#0b478b', color: 'white'}}
                onClick={() => handleClose(course.id)}
              >Delete
              </button>
              {course.name}
            </h1>  
            <span>{course.phone}</span>
            <br/> 
            <span>{course.email}</span>  
          </li>
        ))}
      </ul>
      
    </>
  )
  
}

export default App;
