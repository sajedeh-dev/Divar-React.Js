import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { getCategory } from "services/admin";

import styles from "./AddPost.module.css";
import { getCookie } from "utils/cookie";


function AddPost() {
    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        city: "",
        amount: null,
        images: null,
    });
    const { data } = useQuery(["get-categories"], getCategory);
    // console.log(data);
    const changeHandler = (event) => {
        const name = event.target.name;
        if (name !== "images") {
            setForm({ ...form, [name]: event.target.value });
        } else {
            setForm({ ...form, [name]: event.target.files[0] });
        }

    }

    const addHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (let i in form) {
            formData.append(i, form[i]);
        }
        console.log(formData);
        const token = getCookie("accessToken");
        axios.post(`${import.meta.env.VITE_BASH_URL}post/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`
            }

        })
            .then((res) => toast.success(res.data.message))
            .catch(() => toast.error("مشکلی پیش آمده است"))

    }


    return (
        <form onChange={changeHandler} className={styles.form}>
            <h3>افزودن آگهی</h3>
            <label htmlFor="title">عنوان</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="content">توضیحات</label>
            <textarea name="content" id="content" />
            <label htmlFor="amount">مبلغ</label>
            <input type="number" name="amount" id="amount" />
            <label htmlFor="city">شهر</label>
            <input type="text" name="city" id="city" />
            <label htmlFor="category">دسته بندی</label>
            <select name="category" id="category">
                {data?.data.map((i) =>
                    (<option key={i._id} value={i._id}>{i.name}</option>))}
            </select>
            <label htmlFor="images">افزودن عکس</label>
            <input type="file" name="images" id="images" />
            <button onClick={addHandler}>ایجاد</button>
            <Toaster />
        </form>
    );
}

export default AddPost