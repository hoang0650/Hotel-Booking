import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import { localeData } from 'moment';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import { FiTrash2,FiRotateCw } from "react-icons/fi";
import { Modal, Button } from 'react-bootstrap'

// import { Update } from '../components/Update';
// import Edit from '../components/Edit';
const { TabPane } = Tabs;

function Adminscreen() {


    useEffect(() =>{

        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href='/home'
        }

    }, [])

    return (
        <div className="ml-3 mr-3 mt-3 bs">
            <h1 className="text-center"><b style={{ fontSize: '33px' }}>Admin Panel</b></h1>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                
                    
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>

        </div>
    )
}

export default Adminscreen

// Booking List Component

export function Bookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(async () => {


        try {
            const data = await (await axios.get('/api/bookings/getallbookings')).data
            setBookings(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }

    }, [])

    return (
        <div className="row">

            <div className="col-md-12">

                <h1>Bookings</h1>
                {loading && (<Loader />)}


                <table className="table table-bordered table-light">
                    <thead className="bs">
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td> {booking._id} </td>
                                <td> {booking.userid} </td>
                                <td> {booking.room} </td>
                                <td> {booking.fromDate} </td>
                                <td> {booking.toDate} </td>
                                <td> {booking.status} </td>
                            </tr>
                        }))}
                    </tbody>

                </table>


            </div>

        </div>
    )

}

// Rooms List Component

export function Rooms(room) {
    

    const [rooms, setRooms] = useState([]);
    const [formRoom, setFormRoom] = useState(undefined);
    const [formData, setFormData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async (id)=>{

        const res = await axios.post('/api/rooms/getroombyid' ,{roomid:id});
        setFormRoom(res.data);
        setFormData(res.data);
        setShow(true);
    };
    

    const  refresh = async ()=>{
        try {
            const data = await (await axios.get('/api/rooms/getallrooms')).data
            console.log('refresh', data);
            setRooms(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }


    useEffect(async () => {

      refresh();

    }, [])

    async function deleteRoom(id) {
        console.log(id)
        try {
            const data = await (await axios.delete(`/api/rooms/deleteroom/${id}`)).data
            const _data = await (await axios.get('/api/rooms/getallrooms')).data
            setRooms(_data)
            
            // console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function updateRoom(id){
        try {
     
            const data = await (await axios.put(`/api/rooms/updateroom/${id}`,formData)).data

             refresh();
        } catch (error) {
            console.log(error);
        }
    }

    // async function updateRoom(id) {
    //     console.log(id)
    //     try {
    //         const data = await (await axios.put(`/api/rooms/deleteroom/${id}`)).data
    //         const _data = await (await axios.get('/api/rooms/getallrooms')).data
    //         setRooms(_data)
            
    //         // console.log(data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    
    // async function updateRoom(room){
    //     const response = await (await axios.put(`/api/rooms/updateroom/${rooms.id}`))
    //     const {id, name,
    //         rentperday,
    //         maxcount,
    //         description,
    //         phonenumber,
    //         type,
    //         imageurls: [imgurl1, imgurl2, imgurl3]} = response.data;
    //         setRooms(
    //             rooms.map((room)=>{
    //                 return room.id == id ? {...response.data} : room;
    //             })
    //         )

    // }
    return (

        <div className="row">

            <div className="col-md-12">

                <h1>Rooms</h1>
                {loading && (<Loader />)}


                <table className="table table-bordered table-light">
                    <thead className="bs">
                        <tr>
                            <th>Room ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td> {room._id} </td>
                                <td> {room.name} </td>
                                <td> {room.type} </td>
                                <td> {room.rentperday} </td>
                                <td> {room.maxcount} </td>
                                <td> {room.phonenumber} </td>
                                <button className="btn btn-primary mt-3" style={{float : 'right'}} onClick={()=>deleteRoom(room._id)}><FiTrash2/></button>
                                <button className="btn btn-primary mt-3" style={{float : 'right'}} onClick={handleShow.bind(this, room._id)}><FiRotateCw/></button>
                            </tr>
                        }))}
                    </tbody>

                </table>
                <Modal show={show} onHide={handleClose} size='lg'>

                <Modal.Header>
                    <Modal.Title style={{color: '#203A43'}}>Edit your room</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                   {
                       !!formData
                       ?
                       
                          
                            <div className="row">
            <div className="col-md-5">
                <input type="text" className='form-control' placeholder='id'
                    value={formData._id} onChange={(e)=>{setFormData({...formData, _id:e.target.value})}}
                />
                <input type="text" className='form-control' placeholder='room name'
                    value={formData.name} onChange={(e)=>{setFormData({...formData, name:e.target.value})}}
                />
                <input type="text" className='form-control' placeholder='rent per day'
                    value={formData.rentperday} onChange={(e)=>{setFormData({...formData, rentperday:e.target.value})}}
                />
                <input type="text" className='form-control' placeholder='max count'
                    value={formData.maxcount} onChange={(e)=>{setFormData({...formData, maxcount:e.target.value})}}
                />
                <input type="text" className='form-control' placeholder='description'
                    value={formData.description} onChange={(e)=>{setFormData({...formData, description:e.target.value})}}
                />
                <input type="text" className='form-control' placeholder='phone number'
                    value={formData.phonenumber} onChange={(e)=>{setFormData({...formData, phonenumber:e.target.value})}}
                />

            </div>
            
            <div className="col-md-5">

                <input type="text" className="form-control" placeholder='Deluxe / Non-Deluxe'
                    value={formData.type} onChange={(e)=>{setFormData({...formData, type:e.target.value})}}
                />
                <input type="text" className="form-control" placeholder='Image url 1'
                    value={formData.imgurl1} onChange={(e)=>{setFormData({...formData, imgurl1:e.target.value})}}
                />
                <input type="text" className="form-control" placeholder='Image url 2'
                    value={formData.imgurl2} onChange={(e)=>{setFormData({...formData, imgurl2:e.target.value})}}
                />
                <input type="text" className="form-control" placeholder='Image url 3'
                    value={formData.imgurl3} onChange={(e)=>{setFormData({...formData, imgurl3:e.target.value})}}
                />

                {/* <button className="btn btn-primary mt-3" style={{float : 'right'}} onClick={update}>Update Room</button> */}
                {/* <button className="btn btn-primary mt-3" style={{float : 'right'}} onClick={addRoom}>Add Room</button> */}

            </div>

            {loading && (<Loader />)}

                            </div>

                        :null
                           
                      
                   }
                   

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>updateRoom(formRoom._id)} style={{color: '#000'}}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={handleClose} style={{color: '#000'}}>
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>



            </div>

        </div>
    )

}



// Users List Component


export function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(async () => {


        try {
            const data = await (await axios.get('/api/users/getallusers')).data
            setUsers(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }

    }, [])

    return (
        <div className="row">

            <div className="col-md-12">

                <h1>Rooms</h1>
                {loading && (<Loader />)}


                <table className="table table-bordered table-light">
                    <thead className="bs">
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length && (users.map(user => {
                            return <tr>
                                <td> {user._id} </td>
                                <td> {user.name} </td>
                                <td> {user.email} </td>
                                <td> {user.isAdmin ? 'YES' : 'NO'} </td>

                            </tr>
                        }))}
                    </tbody>

                </table>


            </div>

        </div>
    )

}


// Add Room Component

export function Addroom(){

    const [id,setId]=useState();
    const [name, setName] = useState('');
    const [rentperday, setRentperday ] = useState();
    const [maxcount, setMaxcount ] = useState();
    const [description, setDescription ] = useState();
    const [phonenumber, setPhonenumber ] = useState();
    const [rooms, setRooms] = useState([]);

    const [type, setType] = useState();
    const [imgurl1, setImgurl1] = useState();
    const [imgurl2, setImgurl2] = useState();
    const [imgurl3, setImgurl3] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function addRoom(){

        const newroom= {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imgurl1, imgurl2, imgurl3]
        }

        try {
            setLoading(true);
            const result = await (await axios.post('/api/rooms/addroom' , newroom)).data
            console.log(result)
            setLoading(false)
            Swal.fire('Congratulations' , 'Room Added Successfully' , 'success').then(result => {
                window.location.href='/home'
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('OOps' , 'Something went wrong' , 'error')
        }

    }
    
    
    return (
        <div className="row">
            <div className="col-md-5">
                <input type="text" className='form-control' placeholder='room name'
                    value={name} onChange={(e)=>{setName(e.target.value)}}
                />
                <input type="text" className='form-control' placeholder='rent per day'
                    value={rentperday} onChange={(e)=>{setRentperday(e.target.value)}}
                />
                <input type="text" className='form-control' placeholder='max count'
                    value={maxcount} onChange={(e)=>{setMaxcount(e.target.value)}}
                />
                <input type="text" className='form-control' placeholder='description'
                    value={description} onChange={(e)=>{setDescription(e.target.value)}}
                />
                <input type="text" className='form-control' placeholder='phone number'
                    value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}}
                />

            </div>
            
            <div className="col-md-5">

                <input type="text" className="form-control" placeholder='Deluxe / Non-Deluxe'
                    value={type} onChange={(e)=>{setType(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder='Image url 1'
                    value={imgurl1} onChange={(e)=>{setImgurl1(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder='Image url 2'
                    value={imgurl2} onChange={(e)=>{setImgurl2(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder='Image url 3'
                    value={imgurl3} onChange={(e)=>{setImgurl3(e.target.value)}}
                />

                {/* <button className="btn btn-primary mt-3" style={{float : 'right'}} onClick={update}>Update Room</button> */}
                <button className="btn btn-primary mt-3" style={{float : 'right'}} onClick={addRoom}>Add Room</button>

            </div>

            {loading && (<Loader />)}

        </div>
    )
}