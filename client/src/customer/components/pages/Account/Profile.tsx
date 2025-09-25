import React from "react";
import ProfileFieldCard from "../../../../components/ProfileFieldCard";

const Profile = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
        </div>
        <div className="space-y-5">
          <ProfileFieldCard keys="Name" value={"Nguyen"} />
          <ProfileFieldCard keys="Email" value={"nd@gamil.com"} />
          <ProfileFieldCard keys="Mobile" value={"0896857093"} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
