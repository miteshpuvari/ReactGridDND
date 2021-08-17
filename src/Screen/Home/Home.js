// the logic of drag anf drop is works on id of task if you insert new task and id is not in sequence than it not work proper
// make sure id of task is in proper sequence.

import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";

import "../Home/Home.css";
import Data from "../../Data/Data.json";
import Card from "../Card/Card";

function Home() {
  const [data, setData] = useState(Data);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = React.useState(1);

  // ant form
  const onFinish = () => {
    const workid = value;
    console.log("Wdata is:", workid);
    console.log("updated data is here", data);

    if (workid == 2) {
      console.log(data.newTask);
      const alldata = data.newTask;
      alldata.push({ id, name });
      setData({ ...data, newTask: alldata });
    } else if (workid == 1) {
      const allworking = data.working;
      allworking.push({ id, name });
      setData({ ...data, working: allworking });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // radio button
  const onChange = (e) => {
    console.log("radio checked", value);
    setValue(e.target.value);
  };

  return (
    <div className="main">
      <div>
        <div>
          <h1>Add new Task</h1>
          <Radio.Group onChange={onChange} value={value}>
            <div className="selectTask">
              <p>
                <b>SELECT TASK TYPE |</b>
              </p>
              <div className="radio">
                <Radio value={2} />
                <label>New Task</label>
                <Radio value={1} />
                <label>Working Task</label>
              </div>
            </div>
          </Radio.Group>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="id">
              <Input
                type="text"
                placeholder="Enter Task Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Item>
            &nbsp;
            <Form.Item name="name">
              <Input
                type="text"
                placeholder="Enter Task Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            &nbsp;
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <hr />
      <div>
        <Card task={data} />
      </div>
    </div>
  );
}

export default Home;
