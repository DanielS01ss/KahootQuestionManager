
const baseUrl = 'http://localhost:5000';
export const API_ENDPOINTS = {
    login:`${baseUrl}/auth/login`,
    getAllQuestions:`${baseUrl}/questions/all`,
    updateQuestion:`${baseUrl}/questions/update`,
    deleteQuestion:`${baseUrl}/questions/delete`,
    deleteAllQuestions:`${baseUrl}/questions/delete-all`,
    addQuestion:`${baseUrl}/questions/add-question`,
    getAQuestion:`${baseUrl}/questions/get-question`,
    uploadAfile:`${baseUrl}/questions/upload`
}