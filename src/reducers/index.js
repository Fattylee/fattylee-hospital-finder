import { combineReducers } from "redux";
import { auth } from "./auth";
import { errors } from "./errors";
import { products } from "./posts";

export const reducers = combineReducers({ products, auth, errors });
