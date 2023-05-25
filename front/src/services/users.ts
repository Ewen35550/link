/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/interfaces/User";
import { APIError } from "@/interfaces/error.interface";
import axios from "@/utils/authorizedAxiosInstance";
import { SignUpDto } from "@/validations/SignUp.dto";
import { stringify } from "qs";

const URL_BASE = process.env.VUE_APP_API_URL
  ? process.env.VUE_APP_API_URL.concat("users")
  : "";

export async function signUp(user: SignUpDto): Promise<{
  data?: User;
  error?: APIError;
}> {
  try {
    const formData = stringify(user);

    const axiosInstance = await axios();
    const { data } = await axiosInstance.post(
      URL_BASE.concat("/sign-up"),
      formData
    );
    return { data };
  } catch (error: any) {
    return {
      error: error?.response?.data,
    };
  }
}
