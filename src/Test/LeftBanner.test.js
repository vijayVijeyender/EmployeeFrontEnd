import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import LeftBanner from "../Components/LeftBanner";

describe("Testing LeftBanner Component", () => {
  test("Left banner", () => {
    const mockfn1 = jest.fn();
    const mockfn2 = jest.fn();
    const mockfn3 = jest.fn();
    const component = shallow(
      <LeftBanner
        onChange={mockfn1}
        empId={"emp01"}
        firstName={"Jerin"}
        secondName={"Jack"}
        department={"Front-end"}
        salary={"10000"}
        onAdd={mockfn2}
        onReset={mockfn3}
        mode={true}
        errorMsg={"Invalid first/last name"}
      />
    );
    const aside1 = component.find(".LeftBanner").find(".AsideDiv").at(0);
    expect(aside1.find(".AsideTitle").text()).toBe("AddClear");
    expect(aside1.find("button").at(0).length).toBe(1);
    expect(aside1.find("input").length).toBe(3);
    expect(aside1.find("select").length).toBe(1);
    expect(aside1.find("button").at(1).text()).toBe("Add Employee");
    expect(aside1.find("span").at(1).text()).toBe("Invalid first/last name");
  });

  test("update employee", () => {
    const mockfn1 = jest.fn();
    const mockfn2 = jest.fn();
    const mockfn3 = jest.fn();
    const component = shallow(
      <LeftBanner
        onChange={mockfn1}
        empId={"emp01"}
        firstName={"Jerin"}
        secondName={"Jack"}
        department={"Front-end"}
        salary={"10000"}
        onAdd={mockfn2}
        onReset={mockfn3}
        mode={false}
      />
    );
    const aside1 = component.find(".LeftBanner").find(".AsideDiv").at(0);
    const inputField = aside1.find("input").at(1);
    inputField.simulate("change");
    expect(mockfn1).toHaveBeenCalledTimes(1);
    expect(aside1.find(".AsideTitle").text()).toBe("UpdateClear");
    const addEmp = aside1.find("button").at(1);
    expect(addEmp.text()).toBe("Update Employee");
    addEmp.simulate("click");
    expect(mockfn2).toHaveBeenCalledTimes(1);
    const clearButton = aside1.find("button").at(0);
    clearButton.simulate("click");
    expect(mockfn3).toHaveBeenCalledTimes(1);
  });

  test("Filter employee", () => {
    const mockfn1 = jest.fn();
    const mockfn2 = jest.fn();
    const mockfn3 = jest.fn();
    const component = shallow(
      <LeftBanner
        onChange={mockfn1}
        filter={"Front-end"}
        sort={"Low to High"}
        onFilter={mockfn2}
        onClearFilter={mockfn3}
      />
    );
    const aside1 = component.find(".LeftBanner").find(".AsideDiv").at(1);
    expect(aside1.find(".AsideTitle").text()).toBe("Filter & SortClear");
    expect(aside1.find("button").at(0).text()).toBe("Clear");
    expect(aside1.find("select").at(0).props().value).toBe("Front-end");
    expect(aside1.find("select").at(1).props().value).toBe("Low to High");
    const select = aside1.find("select").at(0);
    select.simulate("change");
    expect(mockfn1).toHaveBeenCalledTimes(1);
    expect(select.props().children.length).toBe(5);
    expect(aside1.find("select").at(1).props().children.length).toBe(3);
    expect(aside1.find("button").at(1).text()).toBe("Filter");
  });
});
