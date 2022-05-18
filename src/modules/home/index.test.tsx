import React from "react";
import { RenderResult, screen } from "@testing-library/react";
import { Home } from ".";
import * as API from "./api";

let wrapper: RenderResult;

test("Home component should be defined", () => {
  expect(Home).toBeDefined();
});

test("Home Shallow rendering", () => {
  expect(wrapper).toMatchSnapshot();
});

test("getProjects should be defined", () => {
  expect(API.getProjects).toBeDefined();
});
