import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Table from "../Components/Table";

describe("testing Table Component", () => {
  test("Table content", () => {
    const mockfn1 = jest.fn();
    const mockfn2 = jest.fn();
    const dummyData = [
      {
        id: "1",
        firstName: "Reya",
        lastName: "John",
        department: "Oops",
        salary: "20000",
      },
      {
        id: "3",
        firstName: "Raja",
        lastName: "Kumar",
        department: "Back-end",
        salary: "25000",
      },
      {
        id: "4",
        firstName: "Thanu",
        lastName: "Sri",
        department: "Cyber-Security",
        salary: "40000",
      },
    ];
    const component = shallow(
      <Table
        data={dummyData}
        onDelete={mockfn1}
        onEdit={mockfn2}
        mode={true}
        editId={undefined}
      />
    );

    const th = component
      .find("div")
      .find("table")
      .find("thead")
      .find("tr")
      .map((td) => td.render().text());
    expect(th).toStrictEqual(["IDEmployee NameDepartmentSalary"]);

    const tbody = component
      .find("div")
      .find("table")
      .find("tbody")
      .find("tr")
      .map((td) => td.render().text());
    expect(tbody).toStrictEqual([
      "1Reya JohnOops20000",
      "3Raja KumarBack-end25000",
      "4Thanu SriCyber-Security40000",
    ]);
    const edit_icon = component
      .find("div")
      .find("table")
      .find("tbody")
      .find("tr")
      .at(2)
      .find("td")
      .at(4)
      .find("img");
    edit_icon.simulate("click", 3);
    expect(mockfn2).toHaveBeenCalledTimes(1);
    const delete_icon = component
      .find("div")
      .find("table")
      .find("tbody")
      .find("tr")
      .at(2)
      .find("td")
      .at(5)
      .find("img");
    delete_icon.simulate("click");
    expect(mockfn1).toHaveBeenCalledTimes(1);
  });
  test("no data table", () => {
    const mockfn1 = jest.fn();
    const mockfn2 = jest.fn();
    const dummyData = [];
    const component = shallow(
      <Table
        data={dummyData}
        onDelete={mockfn1}
        onEdit={mockfn2}
        mode={true}
        editId={undefined}
      />
    );

    const tbody = component.find("div").find("table").find("tbody");

    expect(tbody.text()).toStrictEqual("No Employee Found");
  });
});
