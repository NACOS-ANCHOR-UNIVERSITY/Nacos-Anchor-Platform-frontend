import axios from 'axios';

// Configuration matches the app's (using the real backend, bypassing proxy for this test)
const API_URL = "https://nacos.nextgenerationones.org/api/auth/register";

const testUser = {
    first_name: "Test",
    last_name: "User",
    email: `testuser_${Date.now()}@student.aul.edu.ng`,
    phone: "+2348000000000",
    department: "Computing",
    level: "400",
    matric_number: `AUL/CMP/22/${Math.floor(Math.random() * 1000)}`,
    password: "Password123"
};

console.log("Attempting to register with payload:", testUser);

async function runTest() {
    try {
        const response = await axios.post(API_URL, testUser, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        console.log("Success:", response.data);
    } catch (error) {
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error("Error Status:", error.response.status);
            console.error("Error Data:", JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            // Request was made but no response was received
            console.error("No response received. Request:", error.request);
        } else {
            // Something happened in setting up the request
            console.error("Error setting up request:", error.message);
        }
    }
}

runTest();
