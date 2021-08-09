import axios from 'axios'
import { apiUrl } from "../Environement";

class UploadService {
    uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image' , file)
        const config = {
            'content-type': 'multipart/form-data'
        }
        const res = await axios.post(`${apiUrl}/api/products/uploadImage`,formData,config)
        return res.data
    }
}

export default new UploadService ()