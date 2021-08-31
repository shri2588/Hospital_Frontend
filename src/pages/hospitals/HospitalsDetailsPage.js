import Wards from '../../components/HospitalComponents/Wards';
import Beds from '../../components/HospitalComponents/Beds';
import Doctors from '../../components/HospitalComponents/Doctors';
import NavbarMenu from '../../components/NavbarMenu';

function HospitalDetailsPage(){
    return(
        <>
        <NavbarMenu />
        <Wards />
        <Doctors />
        <Beds />
        </>
    )
}

export default HospitalDetailsPage;

