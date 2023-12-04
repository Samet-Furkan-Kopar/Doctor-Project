import Swal from "sweetalert2";
import advertServices from "../services/adver-service";

const addAdvertTofavorite = (id) => {
    let user = localStorage.getItem("current_user") != null
    ? JSON.parse(localStorage.getItem("current_user"))
    : null;
    if(user?._id && id){
        advertServices.setFavoriteAdvert(id).then(res => {
            if(res?.succedd){
                Swal.fire({ title: 'Eklendi!', text: 'İlan favorilerinize eklendi.', icon: 'success', customClass: 'sweet-alerts' });
                return true
            }else{
                Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' }); 
                return false
            }
        })
    }else {
        location.assign('/login')
    
    }


};

export default addAdvertTofavorite;