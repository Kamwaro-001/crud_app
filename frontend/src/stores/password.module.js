import { forgotPassword, updatePassword } from "@/services/password.service";
import { defineStore } from "pinia";
import { useMessageStore } from "./message";

export const usePasswordStore = defineStore({
  id: "password",
  state: () => ({
    data: {
      password: "",
      token: ""
    }
  }),
  actions: {
    async forgotPassword(email) {
      try {
        await forgotPassword(email);
        useMessageStore().setMessage("Password reset link sent to email. Use it to change your password.");
      } catch (error) {
        useMessageStore().setMessage("An error occurred. A user with this email does not exist.");
        console.error(error.message);
      }
    },
    async updatePassword(token, password) {
      try {
        await updatePassword(token, password);
        useMessageStore().setMessage("Password updated successfully. Use it to login");
      } catch (error) {
        useMessageStore().setMessage("An error occurred. Password reset link is invalid or has expired.");
        console.error(error.message);
      }
    }
  }
});