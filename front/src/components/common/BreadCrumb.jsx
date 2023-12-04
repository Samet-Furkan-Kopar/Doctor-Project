import Link from "next/link";

const BreadCrumb = ({ title = "", bgimage = "", bgimagealttext = "" }) => {
  return (
    <>
      <ol
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <div
          className="breadcrumb ml-1"
          style={{
            position: "absolute",
            left: "10%",
            zIndex: 1,
          }}
        >
          <li className="breadcrumb-item">
            <Link href="/" style={{ color: "#65B7FF" }}>
              Anasayfa
            </Link>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ color: "#fff" }}
          >
            {title}
          </li>
        </div>
      </ol>
    </>
  );
};

export default BreadCrumb;
