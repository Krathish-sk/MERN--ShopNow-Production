import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { Message, Loader } from "../../components";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";

export default function UserListScreen() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  async function deleteHandler(id) {
    if (window.confirm("Are you sure ?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varinat="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {!user.isAdmin && (
                    <>
                      <LinkContainer
                        to={`/admin/user/${user._id}/edit`}
                        style={{ marginRight: "10px" }}
                      >
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
