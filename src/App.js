import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, edituser, Deletuser } from "./slices/Users";
import { Button, Form, Input, Select, Table, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Column } = Table;

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.users);
  const Id = selector.length;
  console.log(Id);
  const [name, setname] = useState("");
  const [status, setoption] = useState(null);
  const [Date, setdate] = useState(null);
  const [updatevalue, setupdate] = useState(false);
  const [updateid, setId] = useState("");
  const [editbuttonclicked, seteditbutton] = useState(null);
  const [editCounts, seteditcount] = useState(0);
  const [ui, setui] = useState(false);

  function handleEdit(Id) {
    const exitinguserid = selector.find((v) => v.Id === Id);
    seteditcount((prevEditCounts) => ({
      ...prevEditCounts,
      [Id]: (prevEditCounts[Id] || 0) + 1,
    }));

    seteditbutton(Id);
    console.log(exitinguserid.Id);
    if (exitinguserid) {
      setdate(exitinguserid.Date);
      setname(exitinguserid.name);
      setoption(exitinguserid.status);
      setId(exitinguserid.Id);
      setupdate(true);
    }
  }
  function handleDelete(Id) {
    dispatch(Deletuser({ Id }));
  }
  function add() {
    dispatch(addUser({ name, status, Date, Id }));
    setdate("");
    setname("");
    setoption(null);
    setui(true);
  }
  function update() {
    dispatch(edituser({ name, status, Date, updateid }));
    setupdate(false);
    seteditbutton(false);
  }
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  function onChange(value) {
    setoption(value);
  }

  return (
    <>
      <div className="form">
        <h1>WELCOME</h1>
        <Form onSubmit={(e) => e.preventDefault()} layout="vertical">
          <Form.Item label="Enter your name">
            <Input
              value={name}
              name="name"
              placeholder="Enter your name"
              onChange={(e) => setname(e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label="Select status">
            <Select
              name="status"
              value={status}
              placeholder="Select status"
              filterOption={filterOption}
              options={[
                {
                  value: "Active",
                  label: "Active",
                },
                {
                  value: "Inactive",
                  label: "Inactive",
                },
              ]}
              onChange={onChange}
            ></Select>
          </Form.Item>
          <Form.Item label="Enter your date of Birth">
            <Input
              type="date"
              name="Date"
              value={Date}
              onChange={(e) => setdate(e.target.value)}
            ></Input>
          </Form.Item>
          {updatevalue ? (
            <Button onClick={update}>update</Button>
          ) : (
            <Button type="primary" onClick={add}>
              login
            </Button>
          )}
        </Form>
      </div>

      <div>
        <>
          {ui ? (
            <Table
              className="table"
              dataSource={selector}
              rowClassName={(user) =>
                user.Id === editbuttonclicked ? "underline" : ""
              }
            >
              <Column title="First Name" dataIndex="name" />
              <Column title="status" dataIndex="status" />
              <Column title="Date" dataIndex="Date" />

              <Column
                title="Edit count"
                render={(_, user) => {
                  return editCounts[user.Id] || 0;
                }}
              />
              <Column
                title="Action"
                render={(_, user) => {
                  return (
                    <Space>
                      <Button onClick={() => handleEdit(user.Id)}>
                        <EditOutlined />
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(user.Id)}
                      >
                        <DeleteOutlined />
                        Delete
                      </Button>
                    </Space>
                  );
                }}
              />
            </Table>
          ) : (
            ""
          )}
        </>
      </div>
    </>
  );
}
export default App;
