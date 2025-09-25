export const uploadToCloudinary = async (pics: File) => {
  const cloud_name = "direwpt4c";
  const upload_preset = "E-commerce";

  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();
    return fileData.url;
  } else {
    console.log("Pic not found");
  }
};
