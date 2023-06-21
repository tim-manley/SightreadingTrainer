import { React, useEffect, useInsertionEffect, useMemo, useState } from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js"
import { useDocumentOnce } from "react-firebase-hooks/firestore"
import { rangeVals, noteNumToLabel } from '../util.js';

function SetupUser(props) {

  const [userDoc, loading, error] = useDocumentOnce(doc(db, "users", props.user.uid));

    const [user, setUser] = useState({
      range: [0, 48],
    })

    const userData = useMemo(() => ({
      ...user,
    }), [user])

    async function updateUser() {
      try {
        let docRef = await setDoc(doc(db, "users", props.user.uid), user);
        console.log("success!", docRef);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      console.log("userData changed");
      console.log(userData);
      console.log(user);
    }, [userData])

    useEffect(() => {
      console.log("userDoc changed");
      if (userDoc) {
        console.log("userDoc true")
        console.log(userDoc.data())
        setUser(userDoc.data())
      }
    }, [userDoc])

    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error...</div>;
    }
    

  return (
    
    <div>
      {error && <div>Error: (error)</div>}
      {loading && <div>Loading...</div>}
      {userDoc &&
        <form>
          <label htmlFor="fromRange">Lowest note</label><br />
          <select name="fromRange" id="fromRange" value={user.range[0]} onChange={(e) => setUser({
            ...user,
            range: [parseInt(e.target.value), parseInt(user.range[1])]
            })}>
              {rangeVals.map(num => (
                  <option key={num} value={num}>{noteNumToLabel(num)}</option>
              ))}
          </select><br />
          <label htmlFor="toRange">Highest note</label><br />
          <select name="toRange" id="toRange" value={user.range[1]} onChange={(e) => setUser({
            ...user,
            range: [parseInt(user.range[0]), parseInt(e.target.value)]
            })}>
              {rangeVals.map(num => (
                  <option key={num} value={num}>{noteNumToLabel(num)}</option>
              ))}
          </select><br />
          <button onClick={updateUser} type="button">
            Save changes
          </button>
        </form>
    }
    </div>
  )
}

export default SetupUser