import { React, useEffect, useInsertionEffect, useMemo, useState } from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js"
import { useDocumentOnce } from "react-firebase-hooks/firestore"

function Skills(props) {
    const [userDoc, loading, error] = useDocumentOnce(doc(db, "users", props.user.uid));

    const [user, setUser] = useState({
      range: [0, 48],
      intervalsScore: 10,
    })

    useEffect(() => {
      console.log("userDoc changed");
      if (userDoc) {
        console.log("userDoc true")
        console.log(userDoc.data())
        setUser(userDoc.data())
      }
    }, [userDoc])

  return (
    <div>
        {error && <div>Error: (error)</div>}
        {loading && <div>Loading...</div>}
        {userDoc && 
        <div>
            <p>Intervals score: {user.intervalsScore}</p>
        </div>
        }
    </div>
  )
}

export default Skills