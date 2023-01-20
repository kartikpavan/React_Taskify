import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1">
          <a href={"/"} className="btn btn-ghost normal-case text-xl">
            Taskify App
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://placeimg.com/80/80/people"
                  alt="profile-pic"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
