import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/* import Swal from 'sweetalert2';
import { BsTrash } from 'react-icons/bs';
import fetchApi from "../../../service/Axios"; */

export default function userActionColumnFormatter({row,authUser}) {

    /* const deleteUser = async (email) => {
        const res = await fetchApi.delete(`/users/${email}`);
        console.log(res);
      }; */

    const user = row.original;

    return (
        <Dropdown className="d-inline mr-3">
        <Dropdown.Toggle size="sm" variant="dark">
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={
              user.id === authUser.id
                ? { pathname: "/user/profile" }
                : { pathname: "/user/edit", state: { user } }
            }
            eventKey={1}
          >
            Update
          </Dropdown.Item>
          <Dropdown.Item eventKey={2}>Change Authority</Dropdown.Item>
          <Dropdown.Divider />
          {/* <Dropdown.Item
            eventKey={3}
            onClick={() =>
              Swal.fire({
                title: "Alert! This step cannot be undo",
                text: "Do you want to continue",
                icon: "warning",
                confirmButtonText: "Delete",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteUser(user.email);
                }
              })
            }
          >
            <span className="text-danger">
              <BsTrash /> Delete
            </span>
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    )
}
