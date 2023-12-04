const Social = ({
  facebookAddress,
  twitterAddress,
  linkedinAddress,
  instagramAddress,
  youtubeAddress,
}) => {
  const socialContent = [
    { id: 1, liveLink: facebookAddress, icon: "fa-facebook" },
    { id: 2, liveLink: twitterAddress, icon: "fa-twitter" },
    { id: 3, liveLink: instagramAddress, icon: "fa-instagram" },
    { id: 4, liveLink: linkedinAddress, icon: "fa-linkedin" },
    // { id: 5, liveLink: youtubeAddress, icon: "fa-youtube" },
  ];
  return (
    <>
      <div className="bg-secondary d-inline p-2 rounded">
        {socialContent.map((item) => (
          <li className="list-inline-item text-white " key={item.id}>
            <a href={item.liveLink} target="_blank" rel="noopener noreferrer" className="text-white">
              <i className={`fa ${item.icon}`}></i>
            </a>
          </li>
        ))}
      </div>
    </>
  );
};

export default Social;
