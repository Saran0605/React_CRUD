import "./App.css";
import { useState,useEffect } from "react";
import { Button,EditableText, InputGroup,Toaster } from "@blueprintjs/core";

const toa = Toaster.create({
  position:"top",


})
function App() {
  const[users,setUsers] = useState([]);
  const[nname,setnname] = useState("");
  const[nemail,setnemail] = useState("");
  const[nweb,setnweb] = useState("");
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => setUsers(json))

  },[])

  function addfunc(){
    const name = nname.trim();
    const email = nemail.trim();
    const website = nweb.trim();

    if(name && email && website){
      fetch('https://jsonplaceholder.typicode.com/users',
      {
        method:"POST",
        body: JSON.stringify({
          name,
          email,
          website
        }),
        headers:{
          "Content-Type":"application/json;charset=UTF-8"
        }
      
      })
    
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users,data])
        toa.show({
          message:"user added succesfully",
          intent:"success",
          timeout:2000
        });
        setnname("")
        setnemail("")
        setnweb("")
      })
    }

  }
  return (
    <div className="App">
      <table className="bp4-html-table modifier">
        <thead>
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
          </tr>
          
        </thead>
        <tbody>
          {users.map(user =>
          <tr key={user.id}>
            <td>{user.id}</td>
            <td><EditableText value={user.name}/></td>
            <td><EditableText value={user.email}/></td>
            <td><EditableText value={user.website}/></td>

            <td><Button intent="success">UPDATE</Button>
            <Button intent="danger">DELETE</Button></td>
          </tr>
          )}  
        </tbody>

        <tfoot>
          <td></td>
          
          
          <td>
            <InputGroup 
          value={nname}
          onChange={(e) => setnname(e.target.value)

          }
          placeholder="Enter name"
          />
          </td>
          <td>
          <InputGroup 
          value={nemail}
          onChange={(e) => setnemail(e.target.value)

          }
          placeholder="Enter email"
          />
          </td>
          <td>

          <InputGroup 
          value={nweb}
          onChange={(e) => setnweb(e.target.value)

          }
          placeholder="Enter website"
          />

          </td>
          <td>
            <Button intent="primary" onClick={addfunc}>Add</Button>
          </td>
          
        </tfoot>
      </table>
    </div>
  );
}

export default App;
