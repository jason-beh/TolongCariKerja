import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CreatableSelect from "react-select/creatable";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";

export default function Profile() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }

    if (!loading && session) {
      setProfileImage(session.dbUser.profileImage || "");
      console.log(session);
    }
  }, [loading, session]);

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      location: "",
      skills: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      contact: Yup.string().required("Please add your phone number"),
      skills: Yup.array().length(1, "Please add a skill"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleProfileImageUpload = async (e) => {
    // Upload image
    const uploadImageData = new FormData();
    uploadImageData.append("file", e.target.files[0]);
    uploadImageData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    uploadImageData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);

    try {
      let { data } = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        data: uploadImageData,
      });

      await axios({
        method: "post",
        url: `/api/profile/deleteImage`,
        data: {
          previousImage: profileImage,
          newImage: data.secure_url,
        },
      });

      setProfileImage(data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {session && (
        <>
          <img src={profileImage}></img>
          <input type="file" onChange={handleProfileImageUpload} />
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-1/3 space-y-5">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              type="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="border border-black"
            />
            {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

            <label htmlFor="location">Location</label>
            <input
              name="location"
              type="location"
              id="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="border border-black"
            />
            {formik.touched.location && formik.errors.location ? (
              <div>{formik.errors.location}</div>
            ) : null}

            <PhoneInput
              name="contact"
              type="contact"
              id="contact"
              defaultCountry="MY"
              placeholder="Enter phone number"
              value={formik.values.contact}
              onChange={(e) => formik.setFieldValue("contact", e)}
            />
            {formik.touched.contact && formik.errors.contact ? (
              <div>{formik.errors.contact}</div>
            ) : null}

            <CreatableSelect
              isMulti
              onChange={(e) => {
                let updatedSkills = e.map((skill) => {
                  return skill.value;
                });
                formik.setFieldValue("skills", updatedSkills);
              }}
              id="skills"
              instanceId="skills"
            />
            {formik.touched.skills && formik.errors.skills ? (
              <div>{formik.errors.skills}</div>
            ) : null}

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}
