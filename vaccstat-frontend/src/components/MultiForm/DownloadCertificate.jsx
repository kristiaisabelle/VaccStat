import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from '../index';
import { ButtonStyles } from './ButtonStyles';
import { StyledDownloadCertificate } from './StyledDownloadCertificate.styled';
import logo from '../../assets/logo - ver3.svg';
import DOH from '../../assets/DOH.png';

export default function DownloadCertificate({ values, isJohnsonJohnson, handle }) {
  const {firstName, middleName, lastName, birthday} = values.multiFormValues;
  const {firstVaccBrand, firstPlace, firstDate, secondVaccBrand, secondPlace, secondDate}  = values.vaccineFormValues;
  const {vaccBrand, place, date} = values.jjFormValues;

  const time = new Date().toLocaleString();

  const fullName = firstName + " " + middleName + " " +  lastName;

  const inputRef = useRef(null);
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      console.log(imgData);
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("vaccStat.pdf");
    });
  };

  return (
    <StyledDownloadCertificate>
      <div className="app__download app__flex app-container">
        <h1 className="app-h1">Vaccine Certificate</h1>
        <p className="p-gray">Your COVID-19 Digital Vaccination Certificate</p>
        <p className="p-text w-50"> Your digital vaccination certifice have been successfully generated. You can donwload, print or take a screenshot of your certificate below. </p>
        <div id="divToPrint" className="flex-col app__border app__flex" ref={inputRef}>
          <img className="logo" src={logo} alt="logo" />
          <p className="p-text">Your COVID-19 Digital Vaccination Certificate</p>

          <div className="app__download-cert app__border app__flex">
            <div className="info">
              <div className="full-name m-10">
                <p><b>Full Name</b></p>
                <p>{fullName}</p>
              </div>
              <div className="app-birthday m-10">
                <p><b>Date of Birth</b></p>
                <p>{birthday}</p>
              </div>
              <div className="app-issuer m-10">
                <p><b>Issuer</b></p>
                <p>Department of Health</p>
              </div>
              <div className="app-issueance m-10">
                <p><b>Issuance Date and Time</b></p>
                <p>{time}</p>
              </div>
            </div>

            <div className="doh-logo">
              <img src={DOH} alt="" />
              <p className="cert-id">Certificate ID: 123456789</p>
            </div>
          </div>

          <table className="vaccine-details app__border">
              <tr>
                <th>Dose Number</th>
                <th>Date of Vaccination</th>
                <th>Brand of Vaccine</th>
                <th>Place of Vaccination</th>
              </tr>
              <tr>
                <div className="breaker"></div>
              </tr>
              {isJohnsonJohnson
                ?
                <>
                  <tr>
                    <td className="noOfDose" >1</td>
                    <td>{date}</td>
                    <td>{vaccBrand}</td>
                    <td>{place}</td>
                  </tr>
                </>
                :
                <>
                  <tr>
                    <td className="noOfDose">1</td>
                    <td>{firstDate}</td>
                    <td>{firstVaccBrand}</td>
                    <td>{firstPlace}</td>
                  </tr>
                  <tr>
                    <div className="breaker"></div>
                  </tr>
                  <tr>
                    <td className="noOfDose">2</td>
                    <td>{secondDate}</td>
                    <td>{secondVaccBrand}</td>
                    <td>{secondPlace}</td>
                  </tr>
                </>
              }
          </table>

          <div className="app__disclaimer">
            <h2>Dislaimer</h2>
            <p className="p-gray">  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus sequi neque cum rem qui animi magni aliquam ex corrupti iste impedit asperiores provident fugiat sint consequuntur quaerat cumque placeat temporibus minus unde beatae, voluptate, eius nulla quidem? Earum, repellendus porro.</p>
          </div>
        </div>

        <Button button={ButtonStyles[7]} click={printDocument}></Button>
      </div>
    </StyledDownloadCertificate>
  )
}
