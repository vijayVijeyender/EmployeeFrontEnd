import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import App from "../App";

describe("Testing Modal Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const dummyData = [
      {
        id: "1",
        firstName: "Reya",
        lastName: "John",
        department: "Oops",
        salary: "20000",
      },
      {
        id: "2",
        firstName: "Raja",
        lastName: "Kumar",
        department: "Back-end",
        salary: "25000",
      },
    ];
    const mockSuccessResponse = dummyData;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise); // 4
  });

  test("Child components in App", () => {
    const component = shallow(<App />);
    expect(component.find(".Header").text()).toBe("Employee Management");
    expect(component.find("LeftBanner").length).toBe(1);
    expect(component.find("Table").length).toBe(1);
    expect(component.find("Modal").length).toBe(0);
  });

  test("on component did mount", (done) => {
    const component = shallow(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/employees");
    global.fetch.mockClear(); // 7
    done();
  });

  test("get data", () => {
    const component = shallow(<App />);
    const spy = jest.spyOn(component.instance(), "handleGetData");
    spy();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith("/api/employees");
  });

  test("Delete", async () => {
    const component = shallow(<App />);
    const spy = jest.spyOn(component.instance(), "handleDelete");
    spy(2);
    expect(component.state().deleteId).toEqual(2);
    expect(component.find("Modal").length).toBe(1);
    const spy1 = jest.spyOn(component.instance(), "handleDeleteEmployee");
    spy1(2);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith("/api/employees/2", {
      method: "Delete",
    });
    const spy2 = await jest.spyOn(component.instance(), "handleGetData");
    const spy3 = await jest.spyOn(component.instance(), "closeModal");
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(component.find("Modal").length).toBe(0);
    expect(component.state().deleteId).toEqual(undefined);
  });

  test("empty input fields", async () => {
    window.alert = jest.fn();
    const component = shallow(<App />);
    component.setState({
      firstName: "",
      lastName: "Sharma",
      department: "Front-end",
      salary: undefined,
    });
    const spy = jest.spyOn(component.instance(), "handleAdd");
    spy();
    expect(component.state().errorMsg).toEqual(
      "All fields are mandatory to fill"
    );
  });

  test("only letters", async () => {
    window.alert = jest.fn();
    const component = shallow(<App />);
    component.setState({
      firstName: "J1223",
      lastName: "Sharma",
      department: "Front-end",
      salary: 10000,
    });
    const spy = jest.spyOn(component.instance(), "handleAdd");
    spy();
    expect(component.state().errorMsg).toEqual(
      "First/Last name should contain only alphabets"
    );
  });

  test("Minimum 3 characters", async () => {
    window.alert = jest.fn();
    const component = shallow(<App />);
    component.setState({
      firstName: "J",
      lastName: "Sharma",
      department: "Front-end",
      salary: 10000,
    });
    const spy = jest.spyOn(component.instance(), "handleAdd");
    spy();
    expect(component.state().errorMsg).toEqual(
      "First/Last name should contain atleast 3 characters"
    );
  });
  test("minimum 15000", async () => {
    window.alert = jest.fn();
    const component = shallow(<App />);
    component.setState({
      firstName: "Anu",
      lastName: "Sharma",
      department: "Front-end",
      salary: 9000,
    });
    const spy = jest.spyOn(component.instance(), "handleAdd");
    spy();
    expect(component.state().errorMsg).toEqual(
      "Minimum salary should be 15000"
    );
  });

  test("Add employee function", async () => {
    window.alert = jest.fn();
    const component = shallow(<App />);
    component.setState({
      firstName: "Anu",
      lastName: "Sharma",
      department: "Front-end",
      salary: 19000,
      editId: undefined,
      sort: "Low to High",
      filter: "Front-end",
    });
    const spy = jest.spyOn(component.instance(), "handleAdd");
    await spy();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith("/api/employees");
    expect(global.fetch).toHaveBeenCalledWith("/api/employees", {
      body:
        '{"firstName":"Anu","lastName":"Sharma","department":"Front-end","salary":19000}',
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/employees?dept=Front-end&salary=Low to High"
    );
    expect(component.state().firstName).toEqual("");
    expect(component.state().department).toEqual("");
    expect(component.state().salary).toEqual("");
  });

  test("Edit employee function", async () => {
    window.alert = jest.fn();
    const component = shallow(<App />);
    component.setState({
      firstName: "Anu",
      lastName: "Sharma",
      department: "Front-end",
      salary: 18000,
      mode: false,
      editId: 2,
    });
    const spy = jest.spyOn(component.instance(), "handleAdd");
    spy();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith("/api/employees/2", {
      body:
        '{"firstName":"Anu","lastName":"Sharma","department":"Front-end","salary":18000}',
      headers: {
        "Content-Type": "application/json",
      },
      method: "put",
    });
    expect(global.fetch).toHaveBeenCalledWith("/api/employees");
  });

  test("onClicking Edit icon", async () => {
    const component = shallow(<App />);
    component.setState({
      data: [
        {
          id: "1",
          firstName: "Reya",
          lastName: "John",
          department: "Oops",
          salary: "20000",
        },
        {
          id: "2",
          firstName: "Raja",
          lastName: "Kumar",
          department: "Back-end",
          salary: "25000",
        },
      ],
    });
    const spy = jest.spyOn(component.instance(), "handleEdit");
    spy(1);
    expect(component.state().firstName).toEqual("Raja");
    expect(component.state().lastName).toEqual("Kumar");
    expect(component.state().department).toEqual("Back-end");
    expect(component.state().salary).toEqual("25000");
    expect(component.state().mode).toEqual(false);
    expect(component.state().editId).toEqual("2");
  });

  test("onClicking handleResetState", async () => {
    const component = shallow(<App />);
    component.setState({
      firstName: "Anu",
      lastName: "Sharma",
      department: "Front-end",
      salary: 18000,
      mode: false,
      editId: 2,
    });
    const spy = jest.spyOn(component.instance(), "handleResetState");
    spy(1);
    expect(component.state().firstName).toEqual("");
    expect(component.state().department).toEqual("");
    expect(component.state().salary).toEqual("");
    expect(component.state().mode).toEqual(true);
    expect(component.state().editId).toEqual(2);
    expect(component.state().errorMsg).toEqual("");
  });

  test("Filter-none sort-none", async () => {
    const component = shallow(<App />);
    component.setState({
      sort: "none",
      filter: "none",
    });
    const spy = jest.spyOn(component.instance(), "handleFilter");
    spy();
    expect(global.fetch).toHaveBeenCalledWith("/api/employees");
  });

  test("filter sort-none", async () => {
    const component = shallow(<App />);
    component.setState({
      sort: "none",
      filter: "Front-end",
    });
    const spy = jest.spyOn(component.instance(), "handleFilter");
    spy();
    expect(global.fetch).toHaveBeenCalledWith("/api/employees?dept=Front-end");
  });
  test("filter-none sort", async () => {
    const component = shallow(<App />);
    component.setState({
      sort: "Low to High",
      filter: "none",
    });
    const spy = jest.spyOn(component.instance(), "handleFilter");
    spy();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/employees?salary=Low to High"
    );
  });
  test("filter sort", async () => {
    const component = shallow(<App />);
    component.setState({
      sort: "Low to High",
      filter: "Front-end",
    });
    const spy = jest.spyOn(component.instance(), "handleFilter");
    spy();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/employees?dept=Front-end&salary=Low to High"
    );
    const spy1 = jest.spyOn(component.instance(), "handleClearFilter");
    spy1();
    expect(component.state().sort).toEqual("none");
    expect(component.state().filter).toEqual("none");
  });
});
