import { useState, useEffect } from 'react'
import { db } from './config/firebase'
import { getDocs,collection, addDoc } from  'firebase/firestore'
import Hero from './components/Hero'

function App() {
  const [posts, setPosts] = useState([])

  useEffect( () => {
    const getPosts = async () => { 
      try {
        const data = await getDocs(collection(db,'posts'))
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id 
        }))
        //console.log(filteredData)
        setPosts(filteredData)
        console.log(posts)
      } catch (err) {
        console.error(err)
      }


    }
    getPosts();

    
  }, [])

  return (
    <div className="App">
      <Hero/>
    </div>
  )
}

export default App
