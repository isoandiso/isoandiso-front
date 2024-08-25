import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

import React from 'react'

const useUser = () => {
  return useContext(UserContext)
}

export default useUser
