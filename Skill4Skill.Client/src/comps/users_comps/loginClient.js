import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiMethod } from "../../services/apiService";
import { saveTokenLocal } from "../../services/localService";

function LogInClient(props) {
  let nav = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubForm = (data) => {
    data.email = data.email.toLowerCase();
    doApi(data);
  };
  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data.token) {
        toast.success("You logged in");
        saveTokenLocal(resp.data.token);
        nav("/");
      }
    } catch (err) {
      toast.error("User password not match, or there another problem");
    }
  };

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  });
  let passwordRef = register("password", { required: true, minLength: 3 });

  return (
    <div className="container">
      <div style={{ minHeight: "20vh" }}></div>
      <form
        onSubmit={handleSubmit(onSubForm)}
        className="col-md-6 p-3 shadow mx-auto h4 form-design text-dark"
      >
        <h1 className="gradi text-center mb-3">
          <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>LOG IN
        </h1>
        <label className="mb-2">
          <i className="fa fa-envelope mx-2" aria-hidden="true"></i>Email
        </label>
        <input
          {...emailRef}
          type="text"
          className="form-control mb-4"
          placeholder="type your email..."
        />
        {errors.email ? (
          <small className="text-danger d-block">* Email invalid</small>
        ) : (
          ""
        )}
        <label className="mb-2">
          <i className="fa fa-lock mx-2" aria-hidden="true"></i>Password
        </label>
        <input
          {...passwordRef}
          type="password"
          className="form-control mb-3"
          placeholder="type your password..."
        />
        {errors.password ? (
          <small className="text-danger d-block">
            * Enter a valid password, minimum 3 characters
          </small>
        ) : (
          ""
        )}
        <h1 className="text-center">
          <button className="btnLog mt-4">
            <i className="mx-2 fa fa-sign-in" aria-hidden="true"></i>Login
          </button>
        </h1>
        <div className="text-center">
          <Link
            to="/signup"
            className="btn mt-3"
            onMouseEnter={() =>
              (document.getElementById("signup").style.color = "skyblue")
            }
            onMouseLeave={() =>
              (document.getElementById("signup").style.color = "#1da1f2")
            }
            style={{ color: "#1da1f2" }}
            id="signup"
          >
            Create an account
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/login/forgotPassword"
            className="btn mb-3"
            onMouseEnter={() =>
              (document.getElementById("forgotPassword").style.color = "red")
            }
            onMouseLeave={() =>
              (document.getElementById("forgotPassword").style.color =
                "#1da1f2")
            }
            style={{ color: "#1da1f2" }}
            id="forgotPassword"
          >
            Forgot Password
          </Link>
        </div>
      </form>
      <div style={{ minHeight: "10vh" }}></div>
    </div>
  );
}

export default LogInClient;
