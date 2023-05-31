import axios from "axios";
const URL = 'http://localhost:8080';
export const fetchMovie = async () => {
    const  {data}  = await axios.get(`${URL}/movie/getAll`, {
        headers: {
        'Content-Type': 'application/json',
        },

    });
    return data;
};
export const createMovie = async (name, description, director) => {
    try {
        const response = await axios.post(
            `${URL}/movie/create`,
            {
                name: name,
                description: description,
                director: director
            },
            {
            headers: {
                'Content-Type': 'application/json',
            }
            }
        )
        .catch((error) => {
            if (error.response) {
            const objectReturn = {data: error.response.data,status: error.response.status};
            return objectReturn;
            }
        });
        const { data, status } = response;
        const objectReturn = {data: data,status: status};
        return objectReturn;
    } catch (err) {
        console.log("err", err);
    }
};

export const updateMovie = async (id, description, director) => {
    try {
        const response = await axios.post(
            `${URL}/movie/update/${id}`,
            {
                description: description,
                director: director
            },
            {
            headers: {
                'Content-Type': 'application/json',
            }
            }
        )
        .catch((error) => {
            if (error.response) {
            const objectReturn = {data: error.response.data,status: error.response.status};
            return objectReturn;
            }
        });
        const { data, status } = response;
        const objectReturn = {data: data,status: status};
        return objectReturn;
    } catch (err) {
        console.log("err", err);
    }
};
export const deleteMovie = async (id, accessToken) => {
    const response = await axios
        .delete(`${URL}/movie/delete/${id}`, {
        headers: {
            x_authorization: accessToken
        }
        })
        .catch((error) => {
        if (error.response) {
            const objectReturn = {
            data: error.response.data,
            status: error.response.status
            };
            return objectReturn;
        }
        });
    const { data, status } = response;
    const objectReturn = {
        data: data,
        status: status
    };
    return objectReturn;
};

export const fetchCategory = async () => {
    const  {data}  = await axios.get(`${URL}/category/getAll`, {
        headers: {
        'Content-Type': 'application/json',
        },

    });
    return data;
};
