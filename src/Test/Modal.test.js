import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import Modal from "../Components/Modal";

describe("Testing Modal Component", () => {
  test("Modal content", () => {
    const mockfn1 = jest.fn();
    const mockfn2 = jest.fn();
    const component = shallow(
      <Modal
        title={"Confirm"}
        message={"Are you sure? Do you want to delete employee detail with id"}
        onDelete={mockfn2}
        onClose={mockfn1}
        id="1"
      />
    );
    expect(component.find(".modalBg").length).toBe(1);
    expect(component.find(".pop").length).toBe(1);
    expect(component.find(".pop span").text()).toBe("Confirm");
    expect(component.find(".pop h3").text()).toBe(
      "Are you sure? Do you want to delete employee detail with id: 1?"
    );
    expect(component.find(".pop button").at(0).text()).toBe("Yes");
    expect(component.find(".pop button").at(1).text()).toBe("No");
  });

  test("Yes button", () => {
    const mockfn1 = jest.fn();
    const mockfn2 = jest.fn();
    const component = shallow(
      <Modal
        title={"Confirm"}
        message={"Are you sure? do you want to delete employee detail with id"}
        onDelete={mockfn2}
        onClose={mockfn1}
        id="emp01"
      />
    );
    const yesButton = component.find(".pop button").at(0);
    yesButton.simulate("click");
    expect(mockfn2).toHaveBeenCalledTimes(1);
  });

  test("Yes button", () => {
    const mockfn1 = jest.fn();
    const mockfn2 = jest.fn();
    const component = shallow(
      <Modal
        title={"Confirm"}
        message={"Are you sure? do you want to delete employee detail with id"}
        onDelete={mockfn2}
        onClose={mockfn1}
        id="emp01"
      />
    );
    const noButton = component.find(".pop button").at(1);
    noButton.simulate("click");
    expect(mockfn1).toHaveBeenCalledTimes(1);
  });
});
