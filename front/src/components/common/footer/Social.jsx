const Social = ({facebookAddress, twitterAddress, linkedinAddress, instagramAddress, youtubeAddress}) => {
  const socialContent = [
    { id: 1, liveLink: facebookAddress, icon: "fa-facebook" },
    { id: 2, liveLink: twitterAddress, icon: "fa-twitter" },
    { id: 3, liveLink: instagramAddress, icon: "fa-instagram" },
    { id: 4, liveLink: linkedinAddress, icon: "fa-linkedin" },
    { id: 5, liveLink: youtubeAddress, icon: "fa-youtube" },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <li className="list-inline-item" key={item.id}>
          <a href={item.liveLink} target="_blank" rel="noopener noreferrer">
            <i className={`fa ${item.icon}`}></i>
          </a>
        </li>
      ))}
    </>
  );
};

export default Social;
