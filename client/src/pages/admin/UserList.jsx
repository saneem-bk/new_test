import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/user/userList");
      const data = await res.data.data;
      setUsers(data);
      console.log("data", data);
    };
    getUsers();
  }, []);

  return (
    <div className="border border-red-400 rounded-md m-4">
      
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-red-200 text-slate-500">
              <Th>User Name</Th>
              <Th>Email</Th>
              <Th className="flex justify-center">Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
          {users && users
               .filter((user) => !user.isDeleted)
               .map((user, index) => (
                <Tr key={index}>
                  <Td color="white">{user.name}</Td>
                  <Td color="white">{user.email}</Td>
                  <Td className="flex justify-center">
                    <button
                      onClick={async () => {
                        const res = await axios.delete(
                          `http://localhost:3000/api/v1/user/delete/${user._id}`
                        );
                        const data = await res.data;
                        console.log(data);
                        if (data.message === "User deleted successfully") {
                          alert(data.message);
                          setTimeout(() => window.location.reload(), 1000);
                        }
                      }}
                      className="rounded-md bg-red-500 px-2 py-1 text-white"
                    >
                      Remove
                    </button>
                  </Td>
                </Tr>
                
                    ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}