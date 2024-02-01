const Footer = () => {
    return (
        <div>
            <p className="dark:text-white-dark text-center ltr:sm:text-left rtl:sm:text-right pt-6">
            Helpyflow © {new Date().getFullYear()} Tüm Hakları Saklıdır. Developed by <a href="https://urunver.com.tr/">DOKTORBURDA!</a>
            </p>
        </div>
    );
};

export default Footer;
