import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthAdminComp from "../../misc_comps/authAdminComp";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { BeatLoader } from "react-spinners";

function EditProductGroup(props) {
  let [cat_ar, setCatAr] = useState([]);
  let [product, setProduct] = useState({});
  let params = useParams();
  let nav = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let nameRef = register("name", {
    required: true,
    minLength: 2,
    maxLength: 150,
  });
  let infoRef = register("info", {
    required: true,
    minLength: 2,
    maxLength: 500,
  });
  let cat_short_idRef = register("cat_short_id", {
    required: true,
    minLength: 1,
    maxLength: 99,
  });
  let img_urlRef = register("img_url", {
    required: false,
    minLength: 3,
    maxLength: 500,
  });

  useEffect(() => {
    doApi();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps


  const doApi = async () => {
    let url = API_URL + "/categoriesGroup";
    let resp = await doApiGet(url);
    setCatAr(resp.data);
    let urlProduct = API_URL + "/group/single/" + params.id;
    let resp2 = await doApiGet(urlProduct);
    setProduct(resp2.data);
  };

  const onSubForm = (formData) => {
    doFormApi(formData);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + "/group/" + params.id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      if (resp.data.modifiedCount) {
        toast.success("updated succesfully");
        nav("/admin/learningGroups");
      } else {
        toast.warning("You not change nothing for update.");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
    }
  };

  return (
    <div className="container mb-5">
      <AuthAdminComp />
      <div style={{ minHeight: "15vh" }}></div>
      {product._id ? (
        <form
          onSubmit={handleSubmit(onSubForm)}
          className="col-md-7 p-3 shadow mx-auto"
        >
          <h1 className="mb-4 gradi text-center ">
            <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Edit
            panel
          </h1>
          <label className="my-2">
            <i className="fa fa-user mx-2" aria-hidden="true"></i>Name
          </label>
          <input
            defaultValue={product.name}
            {...nameRef}
            type="text"
            className="form-control"
          />
          {errors.name ? (
            <small className="text-danger d-block">
              * Enter valid name 2 to 99 chars
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-info mx-2" aria-hidden="true"></i>Information
          </label>
          <textarea
            defaultValue={product.info}
            {...infoRef}
            className="form-control"
            rows="3"
          ></textarea>
          {errors.info ? (
            <small className="text-danger d-block">
              * Enter valid info, 3 to 500 chars
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-bars mx-2" aria-hidden="true"></i>Category
          </label>
          <select
            defaultValue={product.cat_short_id}
            {...cat_short_idRef}
            className="form-select"
          >
            <option value="">Choose Category</option>
            {cat_ar.map((item) => {
              return (
                <option key={item._id} value={item.short_id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors.cat_short_id ? (
            <small className="text-danger d-block">
              You must choose category from the list{" "}
            </small>
          ) : (
            ""
          )}

          <label className="my-2">
            <i className="fa fa-picture-o mx-2" aria-hidden="true"></i>Image url
          </label>
          <input
            defaultValue={product.img_url}
            {...img_urlRef}
            type="text"
            className="form-control mb-4"
          />
          {errors.img_url ? (
            <small className="text-danger d-block">
              * Enter valid img url{" "}
            </small>
          ) : (
            ""
          )}
          <div className="text-center mt-4">
            <button  className="btn btn-outline-warning me-2">Update</button>
            <Link className='btn btn-outline-danger' to="/admin/learningGroups">Cancel</Link>
          </div>
        </form>
      ) : (
        <h2 className="text-center mt-5">
          <BeatLoader />
        </h2>
      )}
    </div>
  );
}

export default EditProductGroup;
