import { Component } from 'react';
import { Wrapper, ID, Head, Edit } from './style'
import { Input, MergeInputs } from './Generic/Input/style'
import { users } from './mock'

class App extends Component {
  state = {
    data: users,
    selected: null,
    searchBy: "name",
    draft: {
      name: "",
      status: "",
      phoneNum: "",
      address: "",
      job: ""
    }
  }
  render() {
    console.log(this.state.searchBy, this.state.search, this.state.draft)
    const onEdit = (value) => {
      this.setState({selected: value})
    }
    const onCancel = () => {
      this.setState({selected: null})
    }
    const onSave = () => {
      let filled = Object.values(this.state.selected).every((value)=>value)
      if(filled){
        let res = this.state.data.map((currentUser) => {
          return currentUser.id === this.state.selected.id ?
            this.state.selected : currentUser
        })
        this.setState({data: res, selected: null})
      } else {
        alert("All feilds not filled")
      }
    }
    const onDataChange = ({target}) => {
      this.setState({
        selected: {
          ...this.state.selected, [target.name]: target.value
        }
      })
    }
    const onSearchDataChange = ({target}) => {
      let res = users.filter((user)=>user[target.value].toLowerCase()?.includes(this.state.search.toLowerCase()))
      this.setState({data: res, searchBy: target.value})
    }
    const onSearch = ({target}) => {
      let res = users.filter((user)=>user[this.state.searchBy].toLowerCase()?.includes(target.value.toLowerCase()))
      this.setState({data: res, search: target.value})
    }
    const onDelete = (user) => {
      console.log(user)
      let res = this.state.data.filter((value)=>value.id!==user.id)
      console.log(res)
      this.setState({data: res})
    }
    const onAdderDraft = ({target}) => {
      this.setState({
        draft: {...this.state.draft, [target.name]: target.value}
      })
    }
    const addUser = () => {
      if(Object.values(this.state.draft).every((value)=>value)){
        this.setState({
          data: [...this.state.data, {...this.state.draft, id: this.state.data[this.state.data.length-1].id+1}],
          draft: {
            name: "",
            status: "",
            phoneNum: "",
            address: "",
            job: ""
          }
        })
      } else {
        alert("All feilds not filled")
      }
    }
    const clearChanges = () => {
      this.setState({
        draft: {
          name: "",
          status: "",
          phoneNum: "",
          address: "",
          job: ""
        }
      })
    }
    return (
      <div>
        <Wrapper>
          <div>
            <div className='twrapper'>
            <div className='search'>
              <Input theme={"classic"} placeholder="Search user" onChange={onSearch}/>
              <select name="select" onChange={onSearchDataChange}>
                <option value="name">Name</option>
                <option value="status">Status</option>
                <option value="phoneNum">Phone number</option>
                <option value="address">Adrress</option>
                <option value="job">Job</option>
              </select>
            </div>
              <div className='table'>
                <table cellSpacing={0}>
                  <Head>
                    <ID color={"none"}>ID</ID>
                    <th width="25%">Name</th>
                    <th width="5%">Status</th>
                    <th width="20%">Phone</th>
                    <th width="25%">Address</th>
                    <th width="25%">Job</th>
                    <th>Delete</th>
                    <Edit color={"none"} active={this.state.selected}>Edit</Edit>
                  </Head>
                  <tbody>
                    {
                      this.state.data?.map((user)=>{
                        return (
                          <tr key={user.id}>
                            <ID>{user.id}</ID>                          
                            {
                                this.state.selected?.id === user.id ? (
                                  <>
                                    <td>
                                      <Input name='name' width={"auto"} type="text" defaultValue={user.name} onChange={onDataChange}/>
                                    </td>
                                    <td>
                                      <Input name='status' width={"auto"} type="text" defaultValue={user.status} onChange={onDataChange}/>
                                    </td>
                                    <td>
                                      <Input name='phoneNum' width={"auto"} type="text" defaultValue={user.phoneNum} onChange={onDataChange}/>
                                    </td>
                                    <td>
                                      <Input name='address' width={"auto"} type="text" defaultValue={user.address} onChange={onDataChange}/>
                                    </td>
                                    <td>
                                      <Input name='job' width={"auto"} type="text" defaultValue={user.job} onChange={onDataChange}/>
                                    </td>
                                    <td className='del'>
                                      <button>Delete</button>
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td>{user.name}</td>
                                    <td>{user.status}</td>
                                    <td>{user.phoneNum}</td>
                                    <td>{user.address}</td>
                                    <td>{user.job}</td>
                                    <td className='del'>
                                      <button onClick={()=>onDelete(user)}>Delete</button>
                                    </td>
                                  </>
                                )
                            }
                            <Edit a={"start"}>
                              {
                                this.state.selected?.id === user.id ? (
                                  <>
                                    <button onClick={() => onCancel(user)}>Cancel</button>
                                    <button onClick={() => onSave(user)}>Save</button>
                                  </>
                                ) : (
                                  <button onClick={() => onEdit(user)}>Edit</button>
                                )
                              }
                            </Edit>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <MergeInputs className='addUser' theme={"light"}>
                <Input value={this.state.draft.name} placeholder='Enter full name' name='name' onChange={onAdderDraft}/>
                <Input value={this.state.draft.status} placeholder='Enter status' name='status' onChange={onAdderDraft}/>
                <Input value={this.state.draft.phoneNum} placeholder='Enter phone number' name='phoneNum' onChange={onAdderDraft}/>
                <Input value={this.state.draft.address} placeholder='Enter address' name='address' onChange={onAdderDraft}/>
                <Input value={this.state.draft.job} placeholder='Enter job' name='job' onChange={onAdderDraft}/>
              </MergeInputs>
              <div className='btns-g'>
                <button onClick={addUser}>Add user</button>
                <button onClick={clearChanges}>Clear changes</button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
