import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';



  export default class Edit extends React.Component(){
        constructor(props){
            super(props);
            const {
                id,
                name,
                rentperday,
                maxcount,
                description,
                phonenumber,
                type,
                imageurls: [imgurl1, imgurl2, imgurl3]}= props.location.state.rooms;
            this.state={
                id,
                name,
                rentperday,
                maxcount,
                description,
                phonenumber,
                type,
                imageurls: [imgurl1, imgurl2, imgurl3]
            };
        }
        update = (e)=>{
            e.preventDefault();
            this.props.updateRoom(this.state);
            this.setSate({name:"",rentperday:"",maxcount:"",description:"",phonenumber:"",type:"",imgurl1:"",imgurl2:"",imgurl3:""});
            this.props.history.push("/")
        }

        render() {
            return (
              <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                  <div className="field">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Rent per day</label>
                    <input
                      type="text"
                      name="rentperday"
                      placeholder="rentperday"
                      value={this.state.rentperday}
                      onChange={(e) => this.setState({ rentperday: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Max count</label>
                    <input
                      type="text"
                      name="maxcount"
                      placeholder="Max count"
                      value={this.state.maxcount}
                      onChange={(e) => this.setState({ maxcount: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={this.state.description}
                      onChange={(e) => this.setState({ description: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phonenumber"
                      placeholder="Phone number"
                      value={this.state.phonenumber}
                      onChange={(e) => this.setState({ phonenumber: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Type</label>
                    <input
                      type="text"
                      name="type"
                      placeholder="Type"
                      value={this.state.type}
                      onChange={(e) => this.setState({ type: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Image 1</label>
                    <input
                      type="text"
                      name="imgurl1"
                      placeholder="Image 1"
                      value={this.state.imgurl1}
                      onChange={(e) => this.setState({ imgurl1: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Image 2</label>
                    <input
                      type="text"
                      name="imgurl2"
                      placeholder="Image 2"
                      value={this.state.imgurl2}
                      onChange={(e) => this.setState({ imgurl2: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Image 3</label>
                    <input
                      type="text"
                      name="imgurl3"
                      placeholder="Image 3"
                      value={this.state.imgurl3}
                      onChange={(e) => this.setState({ imgurl3: e.target.value })}
                    />
                  </div>
                  <button className="ui button blue">Update</button>
                </form>
              </div>
            );
          }

    }
    // export default Edit;