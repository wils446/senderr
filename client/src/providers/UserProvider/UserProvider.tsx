"use client";

import { IUserResponse } from "@/@types/ApiResponse";
import React, { ReactNode, createContext, use, useContext, useEffect, useState } from "react";
import { ApiContext } from "../ApiProvider";

export const UserContext = createContext<IUserResponse>({} as IUserResponse);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { user } = useContext(ApiContext);
	const [userData, setUserData] = useState<IUserResponse>();

	useEffect(() => {
		user.getUser().then((response) => setUserData(response.user));
	}, []);

	if (!userData?.id) return <>{children}</>;

	return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};
