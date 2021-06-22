import { Alert } from "react-native";
import { SETTING } from "../config/setting";

export default Request = {
    async post_signup(endpoint, payload) {
        
        try {
            const response = await fetch(`${SETTING.API_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const json = await response.json();
            return json;
        } catch (err) {
            // Alert.alert("Error", err);
            return err;
        }
    },

    async post_login(endpoint, payload) {
        try {
            const response = await fetch(`${SETTING.API_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const json = await response.json();
            return json;
        } catch (err) {
            // Alert.alert("Error", err);
            return err;
        }
    },

    async post_mask_image(endpoint, payload) {
        try {
            const response = await fetch(`${SETTING.API_URL}${endpoint}`, {
                method : 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(payload)
            });
            const json = await response.json();
            return json;
        } catch (err) {
            // Alert.alert('Error', err)
            return err;
        }
    },

    async post_chart_log(endpoint, payload) {
        try {
            const response = await fetch(`${SETTING.API_URL}${endpoint}`, {
                method : 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(payload)
            });
            const json = await response.json();
            return json;
        } catch (err) {
            // Alert.alert('Error', err)
            return err;
        }
    },

    async post_face_recognition(endpoint, payload) {
        try {
            const response = await fetch(`${SETTING.API_URL}${endpoint}`, {
                method : 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(payload)
            });
            const json = await response.json();
            return json;
        } catch (err) {
            // Alert.alert('Error', err)
            return err;
        }
    },
};