
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MUIDataTable from "mui-datatables";
import { Button, Col, Row } from 'react-bootstrap';
import MainModal from './MainModal';
export function AddCOmponent() {
    const BASEURL = `http://localhost:7880`
    const [getdata, setGetData] = useState([])
    const fetchdata = async () => {
        await axios.get(`${BASEURL}/getusers`).then((resp) => {
            setGetData(resp.data.data)
        })
    }
    useEffect(() => {
        fetchdata()
    }, [])
    console.log(getdata);
    const columns = [
        {
            name: "serial no",
            label: "serial no",
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex) => dataIndex + 1,
            },
        },
        {
            name: "name",
            label: "name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phoneNumber",
            label: "Phone No",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "address",
            label: "Address",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Actions",
            label: "Actions",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowData = data[tableMeta.rowIndex];
                    return (
                        <div>
                            <Button variant="contained" className="text-primary" onClick={() => handleEdit(rowData)}>
                                Edit
                            </Button>
                            <Button variant="outlined" className="text-danger" onClick={() => handleDelete(rowData._id)}>
                                Delete
                            </Button>
                        </div>
                    );
                },
            },
        },
    ];
    const data = getdata;

    const options = {
        filterType: 'checkbox',
        responsive: 'standard', // 'vertical' for vertical scroll, 'standard' for horizontal scroll
        selectableRows: "none", // Hide the checkbox column
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // State to store form values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
    });

    // Handler for form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        await axios.post(`${BASEURL}/registeruser`, formData).then((resp) => {
            console.log(resp);
            if (resp.status === 200) {
                toast.success(resp.data.message)
            }
            if (resp.status === 201) {
                toast.error(resp.data.message)
            }
            fetchdata()
            setFormData({})
            handleClose()
        })
    }

    const [editData, setEditData] = useState({})
    const [editView, setEditView] = useState(false)
    // Define handleEdit function
    const handleEdit = (rowIndex) => {
        // Logic for handling edit action
        setEditView(true)
        console.log(`Edit action for row index ${rowIndex}`);
        setEditData(rowIndex)
    };

    // Handler for form field changes
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        await axios.post(`${BASEURL}/updateuserprofile/${editData._id}`, editData).then((resp) => {
            console.log(resp);
            if (resp.status === 200) {
                toast.success(resp.data.message)
            }
            if (resp.status === 201) {
                toast.error(resp.data.message)
            }
            fetchdata()
            setEditData({})
            setEditView(false)
        })
    }

    // Define handleDelete function
    const handleDelete = async (rowIndex) => {
        // Logic for handling delete action
        console.log(`Delete action for row id ${rowIndex}`);
        await axios.post(`${BASEURL}/deleteuser/${rowIndex}`).then((resp) => {
            if (resp.status === 200) {
                // Update state after successful deletion
                setGetData(prevData => prevData.filter(row => row._id !== rowIndex));
                toast.success(resp.data.message)
            }
            if (resp.status === 201) {
                toast.error(resp.data.message)
            }
        })
    };
    const Addform =
        <div className='p-2'>
            <Form onSubmit={show ? handleSubmit : handleEditSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Name"
                            name="name"
                            value={show ? formData.name : editData.name}
                            onChange={show ? handleChange : handleEditChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={show ? formData.email : editData.email}
                            onChange={show ? handleChange : handleEditChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Phone number"
                            name="phoneNumber"
                            value={show ? formData.phoneNumber : editData.phoneNumber}
                            onChange={show ? handleChange : handleEditChange}
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="1234 Main St"
                        name="address"
                        value={show ? formData.address : editData.address}
                        onChange={show ? handleChange : handleEditChange}
                    />
                </Form.Group>
                <Row>
                    <Col className='d-flex flex-col justify-content-end align-items-end'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div >
    return (
        <div className='p-4'>
            <ToastContainer />
            <Row className="m-4">
                <Col xs={12} lg={4} className="d-flex flex-col justify-content-end align-items-start">
                    {/* <Filter /> */}
                </Col>
                <Col xs={12} lg={8} className="d-flex flex-col justify-content-end align-items-end">
                    <Button variant="primary" onClick={handleShow}>+</Button>
                </Col>
            </Row>
            <div className="table-responsive">
                <MUIDataTable
                    title={"Contact Mangement System"}
                    data={data}
                    columns={columns}
                    options={options}
                />
                {show && <MainModal
                    show={show}
                    modalHeading={show && "Add"}
                    onHide={handleClose}
                    modalContent={Addform}
                />}
                {editView && <MainModal
                    show={editView}
                    modalHeading={editView && "Edit"}
                    onHide={() => { setEditView(false) }}
                    modalContent={Addform}
                />}
            </div>
        </div>
    );
}