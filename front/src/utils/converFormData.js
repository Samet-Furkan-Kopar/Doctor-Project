export const converFormData = (data) => {
  let fd = new FormData();
  Object.entries(data).map(([key, value]) => {
    fd.append(key, value);
  });
  return fd;
};

/* 
Bir formData'daki verileri yazdırmak için 
  console.log("Form Data'daki  veriler");
  for (const entry of fd.entries()) {
    console.log(entry[0], entry[1]);
  }
  */
